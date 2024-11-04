import fs from "fs";
import path from "path";
import initLogger, { LoggerContext } from "../logging";


const logger = initLogger(LoggerContext.UTILITY, 'fs-cache');
/**
 * Function to delete files older than the specified number of days
 * @param directory - The directory containing the files
 * @param days - The number of days to use as the threshold for deletion
 */
export function deleteOldFiles(directory: string, days: number): void {
  // Calculate the threshold time
  const now = Date.now();
  const threshold = days * 24 * 60 * 60 * 1000; // Days to milliseconds

  // Read all items in the directory
  fs.readdir(directory, (err, items) => {
    if (err) {
      logger.error(`Unable to scan directory: ${err.message}`, err);
      return;
    }

    items.forEach((item) => {
      const itemPath = path.join(directory, item);

      // Get item stats
      fs.stat(itemPath, (err, stats) => {
        if (err) {
          logger.error(`Unable to get stats of item: ${err.message}`, err);
          return;
        }

        if (stats.isFile()) {
          // Check if file is older than the threshold
          if (now - stats.mtimeMs > threshold) {
            // Delete the file
            fs.unlink(itemPath, (err) => {
              if (err) {
                logger.error(`Unable to delete file: ${err.message}`, err);
              } else {
                logger.success(`Deleted file: ${itemPath}`);
              }
            });
          }
        } else if (stats.isDirectory()) {
          // Recursively delete files in subdirectory
          deleteOldFiles(itemPath, days);
        }
      });
    });
  });
}
