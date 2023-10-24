/**
* Displays help information based on the provided command or flag.
* @param {{ command?: string, flag?: string }} helpArgs - An object containing command or flag information.
*/
export function displayHelp (helpArgs) {
    const { command, flag } = (helpArgs ? helpArgs : {});
    const helpExitCode = 0;
    const helps = {
	   main: "Usage: quarkscript command <args>",
	   commands: [
		   {
			   keys: ["h", "help"],
			   value: "quarkscript h|help\tDisplays Help",
		   },
		   {
			   keys: ["i", "interpret"],
			   value: "quarkscript i|interpret <path/to/file.quarkscript>\tInterpret the QuarkScript code",
		   },
	   ],
	   flags: [
		   {
			   keys: ["h", "help"],
			   value: "-h || -help\tDisplays help",
		   },
		   {
			   keys: ["d", "debug"],
			   value: "-d || --debug\tDisplays debug info",
		   },
            //    {
            //         keys: ["i", "instance"],
            //         value: "-i || --instance\tWhether or not to execute in a new terminal instace. Default: true",
            //     },
		   {
			   keys: ["maxStackSize"],
			   value: "--maxStackSize\tSets the maximum recursion / call stack size. Default: 1 000 000",
		   },
	   ],
    };

    if (command) {
	   helps.commands.forEach((item) => {
		   item.keys.forEach(keyValues => {
			   if (keyValues == command) {
				   console.log(item.value);
				   process.exit(helpExitCode);
			   }
		   });
	   });
    } else if (flag) {
	   helps.flags.forEach((item) => {
		   item.keys.forEach(keyValues => {
			   if (keyValues == flag) {
				   console.log(item.value);
				   process.exit(helpExitCode);
			   }
		   });
	   });
    }

    console.log(helps.main);

    console.log("Commands:");
    helps.commands.forEach(item => console.log("\t" + item.value));

    console.log("Flags:");
    helps.flags.forEach(item => console.log("\t" + item.value));
    process.exit(helpExitCode);
}