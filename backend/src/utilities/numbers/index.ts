export const roundNumberDecimals = (
  num: number,
  decimals: number = 0
): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
