extern crate cmdline_parser;
extern crate emulator;
extern crate regex;
extern crate rustyline;

mod ui;

use std::fs::File;
use std::path::{Path, PathBuf};

use regex::Regex;

fn main() {
    // Load the program from the filename given as the first cli parameter
    let mut program = if let Some(file_name) = std::env::args().skip(1).next() {
        load_programm(&Path::new(&file_name)).ok()
    } else {
        None
    };

    let io = emulator::IoRegisters::new();
    let mut computer = Computer::new(&io);

    println!("2i-emulator {}, GPLv3, https://github.com/klemens/2i-emulator",
             option_env!("CARGO_PKG_VERSION").unwrap_or("*"));
    ui::status(&mut computer, &io, &program, None);

    let config = rustyline::Config::builder()
        .completion_type(rustyline::CompletionType::List)
        .build();
    let completer = Completer{};
    let mut line_reader = rustyline::Editor::with_config(config);
    line_reader.set_completer(Some(&completer));

    // eg: FD = 1101
    let input_pattern = Regex::new(r"^(?P<index>F[C-F])\s+=\s+(?P<value>[01]{1,8})$").unwrap();

    while let Ok(line) = line_reader.readline("> ") {
        let line = line.trim();

        // Add all non-empty inputs to the history
        if ! line.is_empty() {
            line_reader.add_history_entry(line.as_ref());
        }

        if line.is_empty() {
            if let Some(ref program_inner) = program {
                // Execute next instruction and display the updated ui
                match computer.step(&program_inner) {
                    Ok(flags) => {
                        ui::status(&mut computer, &io, &program, Some(flags));
                    }
                    Err(err) => {
                        println!("Fehler beim Ausführen des Befehls: \"{}\"", err);
                        return;
                    }
                }
            } else {
                println!("Fehler: Kein Mikroprogramm geladen! (Laden per \"load prog.2i\")");
            }
        } else if line.starts_with("load ") {
            let path = cmdline_parser::parse_single(&line[5..].trim());

            if let Ok(prog) = load_programm(Path::new(&path)) {
                program = Some(prog);
                // Reset computer (only keep io registers)
                computer = Computer::new(&io);
                ui::status(&mut computer, &io, &program, None);
            }
        } else if line == "exit" || line == "quit" {
            return;
        } else if line == "help" {
            ui::display_help();
        } else if line == "ram" {
            ui::display_ram(&computer.ram);
        } else if let Some(matches) = input_pattern.captures(line) {
            // Try to set one of the input registers
            if let Ok(value) = u8::from_str_radix(&matches["value"], 2) {
                match &matches["index"] {
                    "FC" => io.inspect_input().borrow_mut()[0] = value,
                    "FD" => io.inspect_input().borrow_mut()[1] = value,
                    "FE" => io.inspect_input().borrow_mut()[2] = value,
                    "FF" => io.inspect_input().borrow_mut()[3] = value,
                    _ => panic!("Invalid regex match"),
                }
                ui::status(&mut computer, &io, &program, None);
            } else {
                println!("Ungültiger Wert.");
            }
        } else {
            println!("Ungültige Eingabe. \"help\" für Hilfe.");
        }
    }
}

/// Load 2i program from path and print errors to stdout if it failes
fn load_programm(path: &Path) -> Result<Program, ()> {
    if let Ok(file) = File::open(&path) {
        match emulator::parse::read_program(file) {
            Ok(program) => Ok(Program { path: path.into(), instructions: program }),
            Err(err) => {
                println!("Fehler beim Laden des Programms: {}", err);
                Err(())
            }
        }
    } else {
        println!("Die angegebene Datei konnte nicht geöffnet werden.");
        Err(())
    }
}

#[derive(Default)]
pub struct Computer<'a> {
    cpu: emulator::Cpu,
    instruction_pointer: usize,
    ram: emulator::Ram<'a>,
}

impl<'a> Computer<'a> {
    fn new(io: &'a emulator::IoRegisters) -> Computer<'a> {
        let mut computer = Computer::default();
        computer.ram.add_overlay(0xFC, 0xFF, io);
        computer
    }

    /// Execute next instruction and update the instruction pointer
    fn step(&mut self, program: &Program) -> emulator::Result<emulator::Flags> {
        let instruction = program.instructions[self.instruction_pointer];
        self.cpu.execute_instruction(instruction, &mut self.ram).map(|(ip, flags)| {
            self.instruction_pointer = ip;
            flags
        })
    }
}

pub struct Program {
    path: PathBuf,
    instructions: [emulator::Instruction; 32],
}

struct Completer {}

impl rustyline::completion::Completer for Completer {
    fn complete(&self, line: &str, pos: usize) -> rustyline::Result<(usize, Vec<String>)> {
        // only complete at the end
        if pos < line.len() {
            return Ok((0, vec![]));
        }

        let commands = [
            "exit",
            "load ",
            "FC = ",
            "FD = ",
            "FE = ",
            "FF = ",
            "help",
            "quit",
            "ram",
        ];

        let completions = commands.iter().filter_map(|&command| {
            // Only keep commands, for which the input is a real prefix
            if command.starts_with(line) && command != line {
                Some(command.into())
            } else {
                None
            }
        }).collect();

        Ok((0, completions))
    }
}
