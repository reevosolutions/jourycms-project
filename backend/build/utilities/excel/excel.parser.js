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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const base_service_1 = __importDefault(require("../../common/base.service"));
const exceptions_1 = __importDefault(require("../../exceptions"));
const XLSX = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
/* load 'stream' for stream support */
const stream_1 = require("stream");
XLSX.stream.set_readable(stream_1.Readable);
class ExcelParser extends base_service_1.default {
    constructor(filePath) {
        super();
        this.parse = async (filePath, mapper, sheet_name) => {
            const scenario = this.initScenario(this.logger, this.parse);
            try {
                if (!filePath && !this.filePath) {
                    throw new exceptions_1.default.UnprocessableEntityException("No file provided");
                }
                this.filePath = filePath || this.filePath;
                if (!fs.existsSync(this.filePath)) {
                    throw new exceptions_1.default.ItemNotFoundException("File not found: " + this.filePath);
                }
                // const buffer = fs.readFileSync(this.filePath);
                // const workbook = XLSX.read(buffer, { type: "buffer" });
                const workbook = XLSX.readFile(this.filePath, { type: 'file' });
                const sheetNames = workbook.SheetNames;
                if (sheet_name) {
                    if (!sheetNames.includes(sheet_name))
                        throw new exceptions_1.default.ItemNotFoundException("This excel file dont contain a sheet with this name" +
                            this.filePath);
                }
                sheet_name = sheetNames[0];
                const sheet = workbook.Sheets[sheet_name];
                const json = XLSX.utils.sheet_to_json(sheet, {
                    header: 1,
                    blankrows: false,
                    defval: "",
                    raw: true,
                });
                if (mapper) {
                    const result = json
                        .map((row, index) => mapper(row, index))
                        .filter((row) => row !== undefined);
                    return result;
                }
                else {
                    return json;
                }
            }
            catch (error) {
                scenario.error(error);
                throw error;
            }
        };
        if (filePath)
            this.filePath = filePath;
    }
}
_a = ExcelParser;
ExcelParser.download = async (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName);
};
exports.default = ExcelParser;
//# sourceMappingURL=excel.parser.js.map