import { cities } from "../config/dz.cities.config";
import { states } from "../config/dz.states.config";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.UTILITY, 'Meta');

export const getMetaFieldValueLabel = (type: Levelup.CMS.V1.Content.Entity.ArticleType | null | undefined, field_key: string, value: string) => {
  const field = type?.custom_meta_fields?.find(item => item.field_key === field_key);

  logger.value('field', type, field);

  if (!field) return value;
  if (
    field.field_type === "select" ||
    field.field_type === "checkbox" ||
    field.field_type === "radiobox"
  ) {
    return (
      (
        field as Levelup.CMS.V1.Content.CustomFields.MetaField<"select">
      ).field_options?.choices?.find(
        item => item.value.toString() === value.toString(),
      )?.label || value
    );
  }
  if (field.field_type === 'algerian_state') {
    return states.find(s => s.code === value)?.name
  }
  if (field.field_type === 'algerian_city') {
    return cities.find(s => s.code === value)?.name
  }
  return value;
};