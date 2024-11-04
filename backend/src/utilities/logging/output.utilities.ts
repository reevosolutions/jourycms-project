/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:39:52
 */

/**
 * @since 29-10-2023 15:59:51
 */
export function generateProgressBar(percentage: number, { barCompleteChar, barIncompleteChar }: {
  barCompleteChar: string,
  barIncompleteChar: string,
} = {
    // barCompleteChar: '\u2588',
    // barIncompleteChar: '\u2591',
    barCompleteChar: '█',
    barIncompleteChar: '░',
  }): string {
  const length = 50; // length of the progress bar
  const position = Math.floor((percentage / 100) * length);
  let progressBar = '[';
  for (let i = 0; i < length; i++) {
    if (i < position) {
      progressBar += barCompleteChar;
    } else if (i === position) {
      progressBar += barCompleteChar;
    } else {
      progressBar += barIncompleteChar;
    }
  }
  progressBar += ']';
  return `Progress: ${progressBar} ${percentage.toFixed(2)}%`;
}

