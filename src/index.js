#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { argv } from "process";
import { interpretQuarkScript } from "./interpreter.js";

// Get the command-line arguments
const [args, flags] = (() => {
    const args = [];
    const flags = {};
    argv.forEach((item) => {
        if (item.match(/(-|--)+/)) { // If it is a flag
            item = item.replace(/(-|--)+/g, "");
            const arr = item.split("=");
            flags[arr[0]] = arr[1];
        } else {
            args.push(item);
        }
    });
    return [args, flags]
})();

// console.log(args, flags);

const [, , fullCommand, filePath] = args;

// Parse the full command into its parts
const [command, subCommand] = fullCommand.split(" ");

// Check if a command and a file path are provided
if (command) {
    // Resolve the provided file path
    const resolvedPath = path.resolve(filePath);

    // Read the QuarkScript file
    fs.readFile(resolvedPath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
        } else {
            // Interpret or compile the QuarkScript code based on the subcommand
            // eslint-disable-next-line no-lonely-if
            if (command === "interpret" || command === "i") {
                console.log(`Program ${resolvedPath} started.`);
                interpretQuarkScript(data, flags);
            } else {
                console.error("Invalid subcommand. Use \"interpret\" or \"i\".");
            }
        }
    });
} else {
    // Display usage information
    console.log("Usage: quarkscript <command> <path/to/file.qs>");
    console.log("Commands:");
    console.log("  quarkscript interpret|i <path/to/file.qs>   Interpret the QuarkScript code");
}
