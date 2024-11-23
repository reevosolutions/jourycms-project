import React from "react";
import SelectCustomField from "./select.custom-field";

export const cities = [
  {code: "RUH", name: "الرياض"},
  {code: "JED", name: "جدة"},
  {code: "MEC", name: "مكة المكرمة"},
  {code: "MED", name: "المدينة المنورة"},
  {code: "DMM", name: "الدمام"},
  {code: "KBR", name: "الخبر"},
  {code: "HUF", name: "الهفوف"},
  {code: "TAF", name: "الطائف"},
  {code: "KHU", name: "خميس مشيط"},
  {code: "BUR", name: "بريدة"},
  {code: "UNA", name: "عنيزة"},
  {code: "YNB", name: "ينبع"},
  {code: "ABH", name: "أبها"},
  {code: "TUU", name: "تبوك"},
  {code: "HAQ", name: "حائل"},
  {code: "NJR", name: "نجران"},
  {code: "ARA", name: "عرعر"},
  {code: "QUR", name: "القطيف"},
  {code: "JUB", name: "الجبيل"},
  {code: "BHA", name: "بيشة"},
];

type Props = Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<
  "select",
  boolean
>;

const KSACityCustomField: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  options,
  default_value,
  metaData,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    RETURN                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <SelectCustomField
      {...{
        label,
        required,
        value,
        onChange,
        options: {
          ...options,
          choices: cities.map(({code, name}) => ({value: code, label: name})),
        },
        default_value,
        metaData,
      }}
    />
  );
};

export default KSACityCustomField;
