import {cities} from "../config/dz.cities.config";
import {states} from "../config/dz.states.config";
import initLogger, {LoggerContext} from "@/lib/logging";
import {ksa_cities} from "../config/ksa.cities.config";

const logger = initLogger(LoggerContext.UTILITY, "Meta");

export type TFieldKey =
  | "entry_point"
  | "medina_mekkah"
  | "price"
  | "experience_years"
  | "shrines"
  | "departure_airoport"
  | "arrival_airoport"
  | "airelines_company"
  | "trip_type"
  | "trip_duration"
  | "flight_number"
  | "flight_date"
  | "start_date"
  | "end_date"
  | "flight_time"
  | "agency"
  | "hotel"
  | "mekkah_hotel"
  | "medina_hotel"
  | "ramdhan_trip"
  | "subsistence_at_mekkah"
  | "subsistence_at_medina"
  | "shrines_at_mekkah"
  | "shrines_at_medina"
  | "hotel_rating"
  | "distance_to_haram"
  | "transportation_to_haram"
  | "hotel_services"
  | "country"
  | "state"
  | "city"
  | "ksa_city"
  | "logo"
  | "gallery"
  | "sex"
  | "medical_speciality";

export const hasMetaField = (
  article: Partial<Levelup.CMS.V1.Content.Entity.Article> | null | undefined,
  field_key: TFieldKey,
) => {
  return (
    !!article &&
    Object.prototype.hasOwnProperty.call(article.meta_fields || {}, field_key)
  );
};
export const getMetaFieldValueLabel = (
  type: Levelup.CMS.V1.Content.Entity.ArticleType | null | undefined,
  field_key: TFieldKey,
  value: string,
) => {
  const field = type?.custom_meta_fields?.find(
    item => item.field_key === field_key,
  );

  logger.value("field", type, field);

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
        item => item.value?.toString() === value?.toString(),
      )?.label || value
    );
  }

  if (field.field_type === "algerian_state") {
    return states.find(s => s.code === value)?.name;
  }
  if (field.field_type === "algerian_city") {
    return cities.find(s => s.code === value)?.name;
  }
  if (field.field_type === "ksa_city") {
    return ksa_cities.find(s => s.code === value)?.name;
  }
  return value;
};
