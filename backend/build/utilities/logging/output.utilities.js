"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:39:52
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProgressBar = generateProgressBar;
/**
 * @since 29-10-2023 15:59:51
 */
function generateProgressBar(percentage, { barCompleteChar, barIncompleteChar } = {
    // barCompleteChar: '\u2588',
    // barIncompleteChar: '\u2591',
    barCompleteChar: '█',
    barIncompleteChar: '░',
}) {
    const length = 50; // length of the progress bar
    const position = Math.floor((percentage / 100) * length);
    let progressBar = '[';
    for (let i = 0; i < length; i++) {
        if (i < position) {
            progressBar += barCompleteChar;
        }
        else if (i === position) {
            progressBar += barCompleteChar;
        }
        else {
            progressBar += barIncompleteChar;
        }
    }
    progressBar += ']';
    return `Progress: ${progressBar} ${percentage.toFixed(2)}%`;
}
//# sourceMappingURL=output.utilities.js.map