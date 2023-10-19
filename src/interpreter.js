/* eslint-disable no-unreachable */
import operations from "./operations.js";

export function interpretQuarkScript (code) {
    console.log(code);

    // Splits every semicolon (required), removes comments and \r\n
    let lines = code.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|\t/g, "").replace(/\r|\n/g, "").split(";");

    // Loop through all
    for (let i = 0; i < lines[i].length; i++) {
        // Remove trailing whitespace
        lines[i] = lines[i].replace(/^\s+/g, "");
    }

    lines = lines.filter((item) => item);

    console.log(lines);

    // Seperate into tokens
    lines = lines.map((line) => line.split(" "));

    console.log(lines);

    const loops = [];
    // Loop logic
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0] == "top" || lines[i][0] == "t") {
            loops.push(i);
        } else if (lines[i][0] == "bottom" || lines[i][0] == "b") {
            const out = [];
            for (let j = loops[loops.length - 1] + 1; j < i; j++) {
                out.push(lines[j]);
            }
            lines.splice(loops[loops.length - 1] + 1, i - loops[loops.length - 1]);
            lines[loops[loops.length - 1]].push(out);
        }
    }

    console.log(lines);

    // Interpret line by line

    function interpret (array) {
        array.forEach((line) => {
            // Parse parameters
            const params = (() => {
                const parameters = [];
                for (let i = 1; i < line.length; i++) {
                    parameters.push(line[i]);
                }
                return parameters;
            })();

            // Execute
            if (line[0].match(/(top|t)/)) {
                while (operations[line[0]](params)) {
                    interpret(params[1]);
                }
            }
            operations[line[0]](params);
        });
    }
    interpret(lines);

}