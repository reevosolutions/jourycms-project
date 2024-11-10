/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */

export const combineArrays: (
  arg: string[][],
  separator?: string,
) => string[] = ([head, ...[headTail, ...tailTail]], separator = " ") => {
  console.log("combineArrays", { head, headTail, tailTail });
  if (!headTail) return head;

  const combined = headTail.reduce((acc, x) => {
    return [...acc, ...head.map(h => `${h}${separator}${x}`)];
  }, [] as string[]);

  return combineArrays([combined, ...tailTail], separator);
};

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let index = 0; index < array.length; index += chunkSize) {
    chunks.push(array.slice(index, index + chunkSize));
  }
  return chunks;
};

export const applyOnChunkedArray = async <T, R>(
  array: T[] | undefined,
  chunkSize: number,
  callback: (chArray: T[], chunkIndex: number) => Promise<R>,
): Promise<void> => {
  array = array || [];
  const chunks = chunkArray(array, chunkSize);
  for (const [index, chunk] of chunks.entries()) {
    await callback(chunk, index);
  }
};
