import * as excelJS from "exceljs";
import BaseService from "../../services/base.service";
import { transformObjectToString } from "../objects";
import exportParcels from './export-parcels';
import exportStores from './export-stores';

export { exportParcels, exportStores };

export type ExporterMapper<T = any> = (items: T) => any;

export type ExportItemsConfig = {
  companies_map?: {
    [k: string]: {
      _id: string;
      tracking_id: string;
      name: string;
    }
  }
}

export default class Exporter extends BaseService {

  private _createdAt: Date;
  private _workbook: excelJS.Workbook;
  private _sheets: { [name: string]: excelJS.Worksheet } = {};
  private _last_sheet: string = "";
  private _mapper?: ExporterMapper;
  private _data: any[] = [];
  public creator: string = "";
  public lastModifiedBy: string = "";
  public constructor() {
    super();
    this._createdAt = new Date();
    this._workbook = new excelJS.Workbook();
    this._workbook.creator = 'Levelup';
    this._workbook.lastModifiedBy = 'Levelup';
    this._workbook.created = this._createdAt;
    this._workbook.modified = this._createdAt;
    this._workbook.lastPrinted = this._createdAt;
  }


  public setWorksheet(name: string, options?: Partial<excelJS.AddWorksheetOptions>): this {
    if (!this._sheets[name])
      this._sheets[name] = this._workbook.addWorksheet(name, options);
    this._last_sheet = name;
    return this;
  }

  public addData<T extends string, D = any>(columns: { [K in T]: Partial<excelJS.Column> & {
    key?: K
  } }, data: D[], mapper: (item: D) => { [Key in T]: unknown }): void {
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

  public setLabels(sheetName: string, labels: {
    [f: string]: { label: string; value: Levelup.V2.UI.FilterMenu.LabelType };
  }): void {

    this.logger.debug('setting labels')

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
        value: transformObjectToString(value)
      });
      this._sheets[sheetName].addRow({
        label: label,
        value: transformObjectToString(value)
      })
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




  public async saveToFile(filename: string) {
    await this._workbook.xlsx.writeFile(filename, {
      useStyles: true,
    });

  }

}

const ex = new Exporter();
