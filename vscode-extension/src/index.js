// index.js

const errorChecking = require("./errorChecking.js");

function activate (context) {
    console.log("QuarkScript extension activated.");

    // Register a command for commenting a line
    const disposable = vscode.commands.registerCommand("extension.commentLine", () => {
        vscode.commands.executeCommand("editor.action.commentLine");
    });

    context.subscriptions.push(disposable);
}

function deactivate () {
    console.log("QuarkScript extension deactivated.");
}

module.exports = {
    activate,
    deactivate,
};

// Rest of your extension logic...