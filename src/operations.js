/**
 * @fileoverview - Implementation of operations
 */

import PromptSync from "prompt-sync";

console.input = PromptSync();

const variables = {
    list: [],
    output: "",
};

const operations = [
    // Creates or sets a new variable
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
    // Increments a variable
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
    // Decrements a variable
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
    // Inputs or outputs a variable
    {
        "keys": ["strange", "s"],
        "value": ([type, ...varName]) => {
            let out = "";
            varName.forEach((item) => {
                if (typeof variables.list[item] != "undefined") {
                    switch (type) {
                    case "out":
                        console.log(variables.list[item]);
                        break;
                    case "cout":
                    case "charOut":
                        out += String.fromCharCode(variables.list[item]);
                        break;
                    case "in":
                        variables.list[item] = parseInt(console.input(""));
                    }
                } else if (`${parseInt(item)}` != "NaN") {
                    switch (type) {
                    case "out":
                        console.log(item);
                        break;
                    case "cout":
                    case "charOut":
                        out += String.fromCharCode(item);
                        break;
                    case "in":
                        variables.list[item] = item;
                    }
                } else {
                    console.error(`Undefined variable ${item}`);
                }
            });
            switch (type) {
            case "cout":
            case "charOut":
                console.log(out);
                break;
            }
        },
    },
    // While (varName != 0)
    {
        "keys": ["top", "t"],
        "value": ([varName]) => {
            return variables.list[varName] != 0 ? true : false;
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