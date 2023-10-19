// errorChecking.js

import { workspace, DiagnosticSeverity, Range, languages } from "vscode";

const missingSemicolonRegex = /\btop\b.*(?<!;)\s*$/;
const missingBottomRegex = /\bbottom\b.*$/;

workspace.onDidChangeTextDocument((event) => {
    const { document } = event;
    const diagnostics = [];

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;

        if (missingSemicolonRegex.test(line)) {
            diagnostics.push({
                severity: DiagnosticSeverity.Error,
                range: new Range(i, 0, i, line.length),
                message: "Missing semicolon at the end of 'top' line.",
            });
        }

        if (missingBottomRegex.test(line)) {
            diagnostics.push({
                severity: DiagnosticSeverity.Error,
                range: new Range(i, 0, i, line.length),
                message: "Line contains 'bottom' without a corresponding condition.",
            });
        }
    }

    languages.createDiagnosticCollection("quarkscript").set(document.uri, diagnostics);
});
export default "";