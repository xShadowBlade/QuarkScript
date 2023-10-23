#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { argv } from "process";
import { interpretQuarkScript } from "./interpreter.js";

// Get the command-line arguments and flags
const [args, flags] = (() => {
    const args = [];
    const flags = {};
    argv.forEach((item) => {
        if (item.match(/(-|--)+/)) { // If it is a flag
            item = item.replace(/(-|--)+/g, "");
            const arr = item.split("=");
            flags[arr[0]] = arr[1] ? arr[1] : true;
        } else {
            args.push(item);
        }
    });
    return [args, flags]
})();

if (flags["d"] || flags["debug"]) console.log(args, flags);

const [, , subCommand, ...argsSubcommand] = args;

function displayHelp () {
    console.log("Usage: quarkscript <command> <path/to/file.quarkscript>");

    console.log("Commands:");
    console.log("\tquarkscript help\tDisplays Help");
    console.log("\tquarkscript interpret|i <path/to/file.quarkscript>\tInterpret the QuarkScript code");

    console.log("Flags:");
    console.log("\t-h || --help\tDisplays Help");
    console.log("\t-d || --debug\tDisplays debug info");

    process.exit(0);
}
if (!subCommand || flags["h"]|| flags["help"]) displayHelp();
// Parse the full command into its parts

switch (subCommand.toLowerCase()) {
    case "i" || "interpret":
        // Read the QuarkScript file
        // Resolve the provided file path
        const resolvedPath = path.resolve(argsSubcommand[0]);
        fs.readFile(resolvedPath, "utf8", (err, data) => {
            if (err) {
                console.error(`Error reading the file: ${err.message}`);
                process.exit(2);
            }
            // Interpret or compile the QuarkScript code based on the subcommand
            console.log(`Program ${resolvedPath} started.`);
            interpretQuarkScript(data, flags);
        });
    break;
    case "":
    case "help":
    case "h":
    default:
        displayHelp();
    break;
}
