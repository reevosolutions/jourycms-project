export const multiLinesToHTML = (text: string): string => {
  return text
    .split("\n")
    .map((line, index) => {
      return `<p>${line}</p>`;
    })
    .join("");
};
