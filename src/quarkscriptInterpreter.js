/* eslint-disable no-unreachable */
import operations from "./operations.js";

export function interpretQuarkScript (code) {
    console.log(code);

    // Splits every semicolon (required), removes comments and \r\n
    let lines = code.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, "").replace(/\r|\n/g, "").split(";");

    // Loop through all
    for (let i = 0; i < lines[i].length ; i++) {
        // Remove trailing whitespace
        lines[i] = lines[i].replace(/^\s+/g, "");
    }

    // Remove empty
    lines = lines.filter(item => item != "");

    console.log(lines);

    // Seperate into tokens
    lines = lines.map((line) => line.split(" "));

    console.log(lines);

    // Interpret line by line
    lines.forEach((line) => {
        // Parse parameters
        const params = (() => {
            const parameters = [];
            for (let i = 1; i < line.length; i++) {
                parameters.push(line[i]);
            }
            return parameters;
        })();

        // Execute
        operations[line[0]](params);
    });
}