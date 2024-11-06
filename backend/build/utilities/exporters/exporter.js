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
exports.exportStores = exports.exportParcels = void 0;
const excelJS = __importStar(require("exceljs"));
const base_service_1 = __importDefault(require("../../common/base.service"));
const objects_1 = require("../objects");
const export_parcels_1 = __importDefault(require("./export-parcels"));
exports.exportParcels = export_parcels_1.default;
const export_stores_1 = __importDefault(require("./export-stores"));
exports.exportStores = export_stores_1.default;
class Exporter extends base_service_1.default {
    constructor() {
        super();
        this._sheets = {};
        this._last_sheet = "";
        this._data = [];
        this.creator = "";
        this.lastModifiedBy = "";
        this._createdAt = new Date();
        this._workbook = new excelJS.Workbook();
        this._workbook.creator = 'Levelup';
        this._workbook.lastModifiedBy = 'Levelup';
        this._workbook.created = this._createdAt;
        this._workbook.modified = this._createdAt;
        this._workbook.lastPrinted = this._createdAt;
    }
    setWorksheet(name, options) {
        if (!this._sheets[name])
            this._sheets[name] = this._workbook.addWorksheet(name, options);
        this._last_sheet = name;
        return this;
    }
    addData(columns, data, mapper) {
        this._mapper = mapper;
        this._data = data.map(el => mapper(el));
        this._sheets[this._last_sheet].columns = Object.values(columns);
        this._sheets[this._last_sheet].addRows(this._data);
        this._sheets[this._last_sheet].eachRow(function (row, rowNumber) {
            // console.log(colors.green('rowNumber'), rowNumber);
            if (rowNumber === 1) {
                row.eachCell(function (cell, colNumber) {
                    row.getCell(colNumber).font = { bold: true, color: { argb: "00FFFFFF" } };
                    row.getCell(colNumber).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "00de4e61" },
                        bgColor: { argb: "00de4e61" }
                    };
                });
            }
        });
    }
    setLabels(sheetName, labels) {
        this.logger.debug('setting labels');
        this.setWorksheet(sheetName);
        this._sheets[sheetName].columns = [
            {
                key: "label",
                header: "Label",
                width: 40,
                style: {
                    font: { size: 12 },
                },
            },
            {
                key: "value",
                header: "Value",
                width: 200,
                style: {
                    font: { size: 12 },
                },
            }
        ];
        Object.values(labels).forEach(({ label, value }) => {
            this.logger.value('label', {
                label: label,
                value: (0, objects_1.transformObjectToString)(value)
            });
            this._sheets[sheetName].addRow({
                label: label,
                value: (0, objects_1.transformObjectToString)(value)
            });
        });
        this._sheets[sheetName].eachRow(function (row, rowNumber) {
            // console.log(colors.green('rowNumber'), rowNumber);
            if (rowNumber === 1) {
                row.eachCell(function (cell, colNumber) {
                    row.getCell(colNumber).font = { bold: true, color: { argb: "00FFFFFF" } };
                    row.getCell(colNumber).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "00de4e61" },
                        bgColor: { argb: "00de4e61" }
                    };
                });
            }
        });
    }
    async saveToFile(filename) {
        await this._workbook.xlsx.writeFile(filename, {
            useStyles: true,
        });
    }
}
exports.default = Exporter;
const ex = new Exporter();
//# sourceMappingURL=exporter.js.map