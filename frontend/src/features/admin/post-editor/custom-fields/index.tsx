import React from "react";
import CheckboxCustomField from "./checkbox.custom-field";
import {Label} from "@/components/ui/label";
import SelectCustomField from "./select.custom-field";
import DateCustomField from "./date.custom-field";
import TimeCustomField from "./time.custom-field";
import TextCustomField from "./text.custom-field";
import NumberCustomField from "./number.custom-field";
import ImageCustomField from "./image.custom-field";
import BooleanCustomField from "./boolean.custom-field";
import ArticleObjectCustomField from "./article-object.custom-field";
import AlgerianStateCustomField from "./algerian-state.custom-field";
import AlgerianCityCustomField from "./algerian-city.custom-field";
import KSACityCustomField from "./ksa-city.custom-field";
import FileCustomField from "./file.custom-field.development";

type Props = {
  field: Levelup.CMS.V1.Content.Entity.ICustomMetaField;
  metaData: {
    [key: string]: any;
  };
  value: any;
  onChange: (value: any) => void;
};

// type TCustomField

const CustomMetaField: React.FC<Props> = ({
  field,
  value,
  onChange,
  metaData,
}) => {
  return (
    <div className="meta-field">
      <Label className="mb-1 block text-base font-semibold">
        {field.field_label}
      </Label>

      <div className="f">
        {field.field_type === "article_object" ? (
          <ArticleObjectCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "boolean" ? (
          <BooleanCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "checkbox" ? (
          <CheckboxCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "select" ? (
          <SelectCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "algerian_state" ? (
          <AlgerianStateCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "algerian_city" ? (
          <AlgerianCityCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "ksa_city" ? (
          <KSACityCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "date" ? (
          <DateCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "time" ? (
          <TimeCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "text" ? (
          <TextCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "number" ? (
          <NumberCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
          />
        ) : field.field_type === "image" ? (
          <ImageCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
            image_ratio={1 / 1}
          />
        ) : field.field_type === "file" ? (
          <FileCustomField
            label={field.field_label}
            metaData={metaData}
            required={field.field_options?.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options?.default_value as any}
            image_ratio={1 / 1}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CustomMetaField;
