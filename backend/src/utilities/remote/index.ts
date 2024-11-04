export function getFileExtensionFromUrl(url: string): string | undefined {
  // Regular expression to match the file extension
  const regex = /\/[^\/?#]+\.(\w+)(?=[?#]|$)/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
}
