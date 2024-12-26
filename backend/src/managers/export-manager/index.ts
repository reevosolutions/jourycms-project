import fs from "fs";
import { randomUUID } from "node:crypto";
import path from "path";
import { Service } from "typedi";
import BaseService from "../../common/base.service";
import { errorToObject } from "../../utilities/exceptions";
import Exporter, { ExportItemsConfig, exportFormEntries } from "./exporter";

/**
 * @upgraded 30-10-2023 16:58:15
 */
@Service()
export default class ExportManager extends BaseService {
  private initialized: boolean = false;

  public constructor() {
    super();
  }

  public generateExportFileName(
    entity: Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels,
    id: string
  ): string {
    return `levelup_export_${entity}_${id}.xlsx`;
  }

  public async generateExcel<D extends { [Key: string]: any } = any>(
    entity: Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels,
    items: D[],
    edge: { [Key: string]: any },
    config?: ExportItemsConfig
  ): Promise<{
    id: string;
  }> {
    try {
      const id = randomUUID();
      let exporter: Exporter;
      if (entity === "formEntry") {
        exporter = await exportFormEntries(items, edge as any, {
          ...config,
          tLabel: (str) => str,
          tSystem: (str) => str,
        });
      }

      const fileDir = path.join(__dirname, "../../../exports");
      if (!fs.existsSync(fileDir)) {
        this.logger.warn("Directory does not exist", fileDir);
        fs.mkdirSync(fileDir, { recursive: true });
      }
      const fileName = this.generateExportFileName(entity, id);
      const filePath = path.join(fileDir, fileName);

      const filename = path.join(filePath);
      this.logger.value(filename);

      await exporter.saveToFile(filename);
      return { id };
    } catch (error) {
      this.logger.save.error({
        payload: {
          message: error.message,
          error: errorToObject(error),
          stack: error.stack,
        },
        name: this.generateExcel.name.toSnakeCase(),
      });
      throw error;
    }
  }

  public async getExportFilePath(
    entity: Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels,
    id: string
  ): Promise<string> {
    try {
      const fileName = this.generateExportFileName(entity, id);
      const filePath = path.join(__dirname, "../../../exports", fileName);
      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }
      return filePath;
    } catch (error) {
      this.logger.save.error({
        payload: {
          message: error.message,
          error: errorToObject(error),
          stack: error.stack,
        },
        name: this.getExportFilePath.name.toSnakeCase(),
      });
      throw error;
    }
  }
}
