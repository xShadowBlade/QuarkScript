/* eslint-disable no-unreachable */
import operations from "./operations.js";
import process from "process";

export function interpretQuarkScript (code, {d, debug, maxCallSize = 1e6}) {
    d = typeof debug != "undefined" ? debug : (typeof d != "undefined" ? d : false);
    // console.log(d);

    if (d) console.log(code);

    // Splits every semicolon (required), removes comments and \r\n
    let lines = code.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|\t/g, "").replace(/\r|\n/g, "").split(";");

    // Loop through all
    for (let i = 0; i < lines.length; i++) {
        // Remove trailing whitespace
        lines[i] = lines[i].replace(/^\s+/g, "");
    }

    lines = lines.filter((item) => item);

    if (d) console.log("\nLines init array: \n", lines);

    // Seperate into tokens
    lines = lines.map((line) => line.split(" "));

    for (let i = 0; i < lines.length; i++) {
        // Remove trailing whitespace
        lines[i] = lines[i].filter(item => Boolean(item));
    }

    if (d) console.log("\nTokens: \n", lines);

    const loops = [];
    function loopCompile () {
        // Loop logic
        for (let i = 0; i < lines.length; i++) {
            if (lines[i][2] == undefined && (lines[i][0] == "top" || lines[i][0] == "t")) {
                loops.push(i);
            } else if (lines[i][2] == undefined && (lines[i][0] == "bottom" || lines[i][0] == "b")) {
                const out = [];
                for (let j = loops[loops.length - 1] + 1; j < i; j++) {
                    out.push(lines[j]);
                }
                lines.splice(loops[loops.length - 1] + 1, i - loops[loops.length - 1]);
                lines[loops[loops.length - 1]].push(out);
            }
        }
        console.log(loops);
        if (loops.length == 1) { loops.splice(0, 1); }
    }
    loopCompile();
    while (loops.length != 0) loopCompile();

    if (d) console.log("\nFinal loops + blocks: \n", lines);

    // Interpret line by line
    let callSize = 0;
    function interpret (array) {
        if (callSize > maxCallSize) {
            console.error(`Max call size of ${maxCallSize} exceeded`);
            process.exit(1);
        }
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
            callSize++;
        });
    }
    interpret(lines);
}