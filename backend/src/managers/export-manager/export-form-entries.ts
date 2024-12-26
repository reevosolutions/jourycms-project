import initLogger from "../../utilities/logging";
import Exporter, { ExportItemsConfig } from "./exporter";

const logger = initLogger("UTILITY", "export-stores");

/**
 *
 * @param {Levelup.CMS.V1.Content.Entity.FormEntry[]} items
 * The used form-entry properties are:
 *
 * @param param1 { tLabel: TFunction, tSystem: TFunction}
 */

type DataType = Partial<Levelup.CMS.V1.Content.Entity.FormEntry>;

const exportFormEntryies = async (
  items: DataType[],
  edge: Levelup.CMS.V1.Content.Api.FormEntries.Export.Response["edge"],
  {
    tLabel,
    tSystem,
  }: {
    tLabel: (string: string) => string;
    tSystem: (string: string) => string;
  } & ExportItemsConfig
) => {
  try {
    const exporter = new Exporter();
    exporter.setWorksheet(tLabel("form-entries"), {
      // create a sheet with red tab colour
      properties: {
        tabColor: {
          argb: "FFC0000",
        },
      },
      // create a sheet with the first row and column frozen
      views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
      headerFooter: {
        differentFirst: true,
        firstHeader: "Test export",
        oddFooter: "Page &P of &N",
        evenFooter: "Page &P of &N",
      },
    });

    exporter.addData<"created_at" | "created_by" | "is_handled", DataType>(
      () => {
        const result = {
          created_at: {
            key: "created_at",
            header: tLabel("Created at") || "",
            width: 30,
          },
          created_by: {
            key: "created_by",
            header: tLabel("Created by") || "",
            width: 30,
          },
          is_handled: {
            key: "is_handled",
            header: tLabel("Is handled") || "",
            width: 30,
          },
        };

        const forms = Object.values(edge?.forms || {}).filter(form=>!!form);
        forms.forEach((form) => {
          form.fields.forEach((field) => {
            result[field.field_key] = {
              key: field.field_key,
              header: field.field_label,
              width: 40,
            };
          });
        });

        return result as any;
      },
      items,
      (item) => {
        const form = edge?.forms?.[item.form];

        const result = {
          created_at: new Date(`${item.created_at}`),
          created_by: item.created_by
            ? edge?.users?.[item.created_by]?.family_name
            : "",
          is_handled: item.is_handled ? tLabel("Yes") : "No",
        };

        for (const key in item.data) {
          if (item.data.hasOwnProperty(key)) {
            const element = item.data[key];
            result[key] = element;
          }
        }
        return result;
      }
    );
    return exporter;
  } catch (error) {
    logger.error("export", error);
    throw error;
  }
};

export default exportFormEntryies;
