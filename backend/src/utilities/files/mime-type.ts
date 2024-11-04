import { lookup } from "mime-types";
import fs from "fs";

/**
 * @description
 * - Use mime-types if you want a fast, extension-based solution.
 * - Use file-type if you need accuracy and are working with files where extensions might be unreliable.
 * @param {string} filePath
 * @param {boolean} fromExtension
 *  - If true, the function will return the mime type based on the file extension.
 *  - If false, the function will return the mime type based on the file content.
 * @returns
 */
export async function getMimeType(
  filePath: string,
  fromExtension: boolean = true
) {
  if (fromExtension) return lookup(filePath);

  throw new Error("Not implemented");
}
