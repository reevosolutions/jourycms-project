import initLogger from "../../utilities/logging";
import Exporter, { ExportItemsConfig } from "./exporter";

const logger = initLogger("UTILITY", "export-stores");

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
      properties: {
        tabColor: {
          argb: "FFC0000",
        },
      },
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

        const forms = Object.values(edge?.forms || {}).filter((form) => !!form);

        // Helper function to get all unique object keys from a field across all items
        const getObjectKeys = (fieldKey: string) => {
          const keys = new Set<string>();
          items.forEach((item) => {
            const data = item.data?.[fieldKey];
            if (data && typeof data === "object" && !Array.isArray(data)) {
              Object.keys(data).forEach((key) => keys.add(key));
            }
          });
          return Array.from(keys);
        };

        // Helper function to get all unique object keys from objects within an array field
        const getArrayObjectKeys = (fieldKey: string) => {
          const keys = new Set<string>();
          items.forEach((item) => {
            const data = item.data?.[fieldKey];
            if (Array.isArray(data)) {
              data.forEach((element) => {
                if (element && typeof element === "object" && !Array.isArray(element)) {
                  Object.keys(element).forEach((key) => keys.add(key));
                }
              });
            }
          });
          return Array.from(keys);
        };

        // Helper function to get max array length for a field across all items
        const getMaxArrayLength = (fieldKey: string) => {
          let maxLength = 0;
          items.forEach((item) => {
            const data = item.data?.[fieldKey];
            if (Array.isArray(data)) {
              maxLength = Math.max(maxLength, data.length);
            }
          });
          return maxLength;
        };

        forms.forEach((form) => {
          form.fields.forEach((field) => {
            const fieldData = items.find((item) => item.data?.[field.field_key]);
            const sampleValue = fieldData?.data?.[field.field_key];

            if (sampleValue && typeof sampleValue === "object" && !Array.isArray(sampleValue)) {
              // Handle object fields
              const keys = getObjectKeys(field.field_key);
              keys.forEach((key) => {
                const columnKey = `${field.field_key}.${key}`;
                result[columnKey] = {
                  key: columnKey,
                  header: `${field.field_label}.${key}`,
                  width: 40,
                };
              });
            } else if (Array.isArray(sampleValue) || items.some((item) => Array.isArray(item.data?.[field.field_key]))) {
              // Handle array fields (check all items to confirm array type)
              const maxLength = getMaxArrayLength(field.field_key);
              const objectKeys = getArrayObjectKeys(field.field_key);

              logger.debug(`Processing array field: ${field.field_key}`, { maxLength, objectKeys });

              if (objectKeys.length > 0) {
                // Array of objects
                for (let i = 0; i < maxLength; i++) {
                  objectKeys.forEach((key) => {
                    const columnKey = `${field.field_key}[${i}].${key}`;
                    result[columnKey] = {
                      key: columnKey,
                      header: `${field.field_label}[${i}].${key}`,
                      width: 40,
                    };
                  });
                }
              } else {
                // Array of non-objects
                for (let i = 0; i < maxLength; i++) {
                  const columnKey = `${field.field_key}[${i}]`;
                  result[columnKey] = {
                    key: columnKey,
                    header: `${field.field_label}[${i}]`,
                    width: 40,
                  };
                }
              }
            } else {
              // Handle non-object, non-array fields
              result[field.field_key] = {
                key: field.field_key,
                header: field.field_label,
                width: 40,
              };
            }
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
            if (typeof element === "object" && !Array.isArray(element)) {
              // Flatten object fields
              for (const subKey in element) {
                if (element.hasOwnProperty(subKey)) {
                  result[`${key}.${subKey}`] = element[subKey];
                }
              }
            } else if (Array.isArray(element)) {
              // Flatten array fields
              element.forEach((value, index) => {
                if (value && typeof value === "object" && !Array.isArray(value)) {
                  // Array of objects
                  for (const subKey in value) {
                    if (value.hasOwnProperty(subKey)) {
                      result[`${key}[${index}].${subKey}`] = value[subKey];
                    }
                  }
                } else {
                  // Array of non-objects
                  result[`${key}[${index}]`] = value;
                }
              });
            } else {
              // Direct assignment for non-object, non-array fields
              result[key] = element;
            }
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