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
    return acc.concat(head.map(h => `${h}${separator}${x}`));
  }, [] as string[]);

  return combineArrays([combined, ...tailTail], separator);
};

export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

export const applyOnChunkedArray = async <T, R>(
  arr: T[] | undefined,
  chunkSize: number,
  callback: (chArr: T[], chunkIndex: number) => Promise<R>,
): Promise<void> => {
  arr = arr || [];
  const chunks = chunkArray(arr, chunkSize);
  for (let i = 0; i < chunks.length; i += 1) {
    await callback(chunks[i], i);
  }
};
