#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { argv } from "process";
import { interpretQuarkScript } from "../src/interpreter.js";
import { displayHelp } from "../src/help.js";

/**
 * Extracts command-line arguments and flags from the process arguments.
 * @returns {[string[], {[flag: string]: string | boolean}]} Tuple containing arguments and flags.
 */
const [args, flags] = (() => {
    const argsA = [];
    const flagsA = {};
    argv.forEach((item) => {
        if (item.match(/(-|--)+/)) { // If it is a flag
            item = item.replace(/(-|--)+/g, "");
            const arr = item.split("=");
            flagsA[arr[0]] = arr[1] ? arr[1] : true;
        } else {
            argsA.push(item);
        }
    });
    return [argsA, flagsA];
})();

if (flags["d"] || flags["debug"]) console.log("Args:", args, "\r\n", "Flags:", flags);

/**
 * Represents the main entry point for the QuarkScript CLI tool.
 */
const [, , subCommand, ...argsSubcommand] = args;

if (!subCommand || (!subCommand && (flags["h"] || flags["help"]))) displayHelp();

// Parse the full command into its parts

switch (subCommand.toLowerCase()) {
case "i" || "interpret": {
    // Read the QuarkScript file
    // Resolve the provided file path

    if (typeof argsSubcommand[0] === "undefined" || flags["h"] || flags["help"]) displayHelp({ command: "interpret" });
    const resolvedPath = path.resolve(argsSubcommand[0]);

    fs.readFile(resolvedPath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
            process.exit(2);
        }
        // Interpret or compile the QuarkScript code based on the subcommand
        console.log(`Program ${resolvedPath} started.`);
        interpretQuarkScript(data, flags);
        console.log(`Program ${resolvedPath} exited.`);
    });
}; break;
case "":
case "help":
case "h":
    displayHelp();
    break;
default:
    console.error(`Quarkscript: Invalid command "${subCommand.toLowerCase()}"`);
    console.log("Run \"quarkscript help\" to display help info");
    break;
}
