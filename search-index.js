var searchIndex = {};
searchIndex["2i_emulator_cli"] = {"doc":"","items":[],"paths":[]};
searchIndex["emulator"] = {"doc":"This crate implements an emulator for the *Minirechner 2i*","items":[[4,"Error","emulator","",null,null],[13,"Bus","","",0,null],[13,"Cpu","","",0,null],[13,"Instruction","","",0,null],[13,"Parse","","",0,null],[0,"alu","","The 2i 8 bit alu.",null,null],[3,"Alu","emulator::alu","Alu of the 2i.",null,null],[3,"Flags","","Flags of the 2i.",null,null],[11,"calculate","","Execute an instruction with two operands on the alu.",1,null],[11,"eq","","",2,{"inputs":[{"name":"flags"},{"name":"flags"}],"output":{"name":"bool"}}],[11,"ne","","",2,{"inputs":[{"name":"flags"},{"name":"flags"}],"output":{"name":"bool"}}],[11,"default","","",2,{"inputs":[],"output":{"name":"flags"}}],[11,"fmt","","",2,{"inputs":[{"name":"flags"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"clone","","",2,{"inputs":[{"name":"flags"}],"output":{"name":"flags"}}],[11,"new","","",2,{"inputs":[{"name":"bool"},{"name":"bool"},{"name":"bool"}],"output":{"name":"flags"}}],[11,"carry","","",2,{"inputs":[{"name":"flags"}],"output":{"name":"bool"}}],[11,"negative","","",2,{"inputs":[{"name":"flags"}],"output":{"name":"bool"}}],[11,"zero","","",2,{"inputs":[{"name":"flags"}],"output":{"name":"bool"}}],[0,"bus","emulator","The 2i bus.",null,null],[3,"Ram","emulator::bus","Ram of the 2i.",null,null],[3,"IoRegisters","","IoRegisters of the 2i.",null,null],[8,"Bus","","Bus of the 2i.",null,null],[10,"read","","",3,{"inputs":[{"name":"bus"},{"name":"u8"}],"output":{"name":"result"}}],[10,"write","","",3,{"inputs":[{"name":"bus"},{"name":"u8"},{"name":"u8"}],"output":{"name":"result"}}],[11,"new","","Create a new ram with all addresses initialised to zero.",4,{"inputs":[],"output":{"name":"ram"}}],[11,"inspect","","Direct access to the ram wrapped in a RefCell.",4,{"inputs":[{"name":"ram"}],"output":{"name":"refcell"}}],[11,"add_overlay","","Add a bus as an overlay to the ram.",4,{"inputs":[{"name":"ram"},{"name":"u8"},{"name":"u8"},{"name":"bus"}],"output":null}],[11,"read","","",4,{"inputs":[{"name":"ram"},{"name":"u8"}],"output":{"name":"result"}}],[11,"write","","",4,{"inputs":[{"name":"ram"},{"name":"u8"},{"name":"u8"}],"output":{"name":"result"}}],[11,"new","","Create a new IoRegisters with all registers initialised to zero.",5,{"inputs":[],"output":{"name":"ioregisters"}}],[11,"inspect_input","","Direct access to the input registers wrapped in a RefCell.",5,{"inputs":[{"name":"ioregisters"}],"output":{"name":"refcell"}}],[11,"inspect_output","","Direct access to the output registers wrapped in a RefCell.",5,{"inputs":[{"name":"ioregisters"}],"output":{"name":"refcell"}}],[11,"read","","",5,{"inputs":[{"name":"ioregisters"},{"name":"u8"}],"output":{"name":"result"}}],[11,"write","","",5,{"inputs":[{"name":"ioregisters"},{"name":"u8"},{"name":"u8"}],"output":{"name":"result"}}],[0,"cpu","emulator","The 2i cpu.",null,null],[3,"Cpu","emulator::cpu","Cpu of the 2i.",null,null],[11,"new","","Create a new cpu with all registers and flags set to zero.",6,{"inputs":[],"output":{"name":"cpu"}}],[11,"execute_instruction","","Execute the given instruction on the cpu using the given, bus, input\nand output. Returns the address of the next instruction and the alu flags.",6,{"inputs":[{"name":"cpu"},{"name":"instruction"},{"name":"b"}],"output":{"name":"result"}}],[11,"inspect_registers","","Direct access to the registers.",6,null],[11,"inspect_flags","","Direct access to the flag register.",6,{"inputs":[{"name":"cpu"}],"output":{"name":"flags"}}],[0,"instruction","emulator","The 2i instruction",null,null],[3,"Instruction","emulator::instruction","Instruction of the 2i.",null,null],[11,"clone","","",7,{"inputs":[{"name":"instruction"}],"output":{"name":"instruction"}}],[11,"new","","Create a new Instruction from a u32. Fails if more than 25 bits\nare used.",7,{"inputs":[{"name":"u32"}],"output":{"name":"result"}}],[11,"new_from_string","","Creat a new Instruction from a binary string (consisting only of ones\nand zeroes). Failes if more than 25 bits (characters) are used.",7,{"inputs":[{"name":"str"}],"output":{"name":"result"}}],[11,"get_instruction","","Get the instruction as a 25 bit integer (the first 7 most significant\nbits of the u32 are always zero)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"u32"}}],[11,"should_store_flags","","MCHFLG",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"get_alu_instruction","","MALUS0-3 (4 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"u8"}}],[11,"is_alu_input_b_const","","MALUIB",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"is_alu_input_a_bus","","MALUIA",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"should_write_register","","MRGWE",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"should_write_register_b","","MRGWS",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"get_register_address_b","","MRGAB0-2 (3 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"usize"}}],[11,"get_constant_input","","MRGAB0-3 (4 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"u8"}}],[11,"get_register_address_a","","MRGAA0-2 (3 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"usize"}}],[11,"is_bus_enabled","","BUSEN",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"is_bus_writable","","BUSWR",7,{"inputs":[{"name":"instruction"}],"output":{"name":"bool"}}],[11,"get_next_instruction_address","","NA0-4 (5 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"u8"}}],[11,"get_address_control","","MAC0-1 (2 bit)",7,{"inputs":[{"name":"instruction"}],"output":{"name":"u8"}}],[11,"to_text_paraphrase","","Create a textual representation of the instruction",7,{"inputs":[{"name":"instruction"},{"name":"option"}],"output":{"name":"string"}}],[11,"fmt","","",7,{"inputs":[{"name":"instruction"},{"name":"formatter"}],"output":{"name":"result"}}],[0,"parse","emulator","Parse 2i programs.",null,null],[5,"read_program","emulator::parse","Parse 2i programs in string representation into arrays of `Instruction`s.",null,{"inputs":[{"name":"r"}],"output":{"name":"result"}}],[6,"Result","emulator","",null,null],[11,"fmt","","",0,{"inputs":[{"name":"error"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"fmt","","",0,{"inputs":[{"name":"error"},{"name":"formatter"}],"output":{"name":"result"}}]],"paths":[[4,"Error"],[3,"Alu"],[3,"Flags"],[8,"Bus"],[3,"Ram"],[3,"IoRegisters"],[3,"Cpu"],[3,"Instruction"]]};
initSearch(searchIndex);
