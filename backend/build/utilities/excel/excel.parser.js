var _a;
import BaseService from "../../common/base.service";
import exceptions from "../../exceptions";
import * as XLSX from "xlsx";
import * as fs from "fs";
/* load 'stream' for stream support */
import { Readable } from "stream";
XLSX.stream.set_readable(Readable);
class ExcelParser extends BaseService {
    constructor(filePath) {
        super();
        this.parse = async (filePath, mapper, sheet_name) => {
            const scenario = this.initScenario(this.logger, this.parse);
            try {
                if (!filePath && !this.filePath) {
                    throw new exceptions.UnprocessableEntityException("No file provided");
                }
                this.filePath = filePath || this.filePath;
                if (!fs.existsSync(this.filePath)) {
                    throw new exceptions.ItemNotFoundException("File not found: " + this.filePath);
                }
                // const buffer = fs.readFileSync(this.filePath);
                // const workbook = XLSX.read(buffer, { type: "buffer" });
                const workbook = XLSX.readFile(this.filePath, { type: 'file' });
                const sheetNames = workbook.SheetNames;
                if (sheet_name) {
                    if (!sheetNames.includes(sheet_name))
                        throw new exceptions.ItemNotFoundException("This excel file dont contain a sheet with this name" +
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
export default ExcelParser;
//# sourceMappingURL=excel.parser.js.map