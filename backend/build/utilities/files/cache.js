"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldFiles = deleteOldFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logging_1 = __importStar(require("../logging"));
const logger = (0, logging_1.default)(logging_1.LoggerContext.UTILITY, 'fs-cache');
/**
 * Function to delete files older than the specified number of days
 * @param directory - The directory containing the files
 * @param days - The number of days to use as the threshold for deletion
 */
function deleteOldFiles(directory, days) {
    // Calculate the threshold time
    const now = Date.now();
    const threshold = days * 24 * 60 * 60 * 1000; // Days to milliseconds
    // Read all items in the directory
    fs_1.default.readdir(directory, (err, items) => {
        if (err) {
            logger.error(`Unable to scan directory: ${err.message}`, err);
            return;
        }
        items.forEach((item) => {
            const itemPath = path_1.default.join(directory, item);
            // Get item stats
            fs_1.default.stat(itemPath, (err, stats) => {
                if (err) {
                    logger.error(`Unable to get stats of item: ${err.message}`, err);
                    return;
                }
                if (stats.isFile()) {
                    // Check if file is older than the threshold
                    if (now - stats.mtimeMs > threshold) {
                        // Delete the file
                        fs_1.default.unlink(itemPath, (err) => {
                            if (err) {
                                logger.error(`Unable to delete file: ${err.message}`, err);
                            }
                            else {
                                logger.success(`Deleted file: ${itemPath}`);
                            }
                        });
                    }
                }
                else if (stats.isDirectory()) {
                    // Recursively delete files in subdirectory
                    deleteOldFiles(itemPath, days);
                }
            });
        });
    });
}
//# sourceMappingURL=cache.js.map