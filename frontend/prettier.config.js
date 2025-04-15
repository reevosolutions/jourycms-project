module.exports = {
  arrowParens: "avoid", // Avoid parentheses for single-argument arrow functions
  bracketSameLine: false, // Place closing bracket of JSX tags on a new line
  bracketSpacing: true, // Add spaces inside object literals ({ foo: bar })
  htmlWhitespaceSensitivity: "css", // Respect CSS display property for HTML whitespace sensitivity
  insertPragma: false, // Do not insert a pragma at the top of files
  jsxSingleQuote: false, // Use double quotes in JSX
  plugins: ["prettier-plugin-tailwindcss"], // Include Prettier plugin for Tailwind CSS
  printWidth: 80, // Wrap lines at 80 characters
  proseWrap: "always", // Wrap markdown text at the print width
  quoteProps: "as-needed", // Only add quotes around object keys when required
  requirePragma: false, // Do not require a pragma to format files
  semi: true, // Use semicolons at the end of statements
  singleQuote: false, // Use double quotes instead of single quotes
  tabWidth: 2, // Use 2 spaces per indentation level
  trailingComma: "all", // Use trailing commas where valid in ES5
  useTabs: true, // Use spaces instead of tabs for indentation
};
