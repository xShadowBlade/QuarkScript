/**
 * @fileoverview - Implementation of operations
 */

import PromptSync from "prompt-sync";

console.input = PromptSync();

const variables = {
    list: [],
};

const operations = [
    {
        "keys": ["charm", "c"],
        "value": ([varName, value]) => {
            variables.list[varName] = (() => {
                // Check if the value is not NaN
                if (value && `${parseInt(value)}` != "NaN") {
                    return value;
                } else if (value && typeof variables.list[value] != "undefined") {
                    return variables.list[value];
                } else {
                    return 0;
                }
            })();
        },
    },
    {
        "keys": ["up", "u"],
        "value": ([varName, value]) => {
            variables.list[varName] = variables.list[varName] + (() => {
                // Check if the value is not NaN
                if (value && `${parseInt(value)}` != "NaN") {
                    return value;
                } else if (value && typeof variables.list[value] != "undefined") {
                    return variables.list[value];
                } else {
                    return 1;
                }
            })();
        },
    },
    {
        "keys": ["down", "d"],
        "value": ([varName, value]) => {
            variables.list[varName] = variables.list[varName] - (() => {
                // Check if the value is not NaN
                if (value && `${parseInt(value)}` != "NaN") {
                    return value;
                } else if (value && typeof variables.list[value] != "undefined") {
                    return variables.list[value];
                } else {
                    return 1;
                }
            })();
        },
    },
    {
        "keys": ["strange", "s"],
        "value": ([type, varName]) => {
            if (typeof variables.list[varName] != "undefined") {
                switch (type) {
                case "out":
                    console.log(variables.list[varName]);
                    break;
                case "in":
                    variables.list[varName] = parseInt(console.input(""));
                }
            } else {
                console.error(`Undefined variable ${varName}`);
            }
        },
    },
];

export default (() => {
    const out = {};
    operations.forEach(operation => {
        operation.keys.forEach(key => {
            out[key] = operation.value;
        });
    });
    return out;
})();