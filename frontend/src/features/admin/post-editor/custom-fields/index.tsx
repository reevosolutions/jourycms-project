import React from 'react';
import CheckboxCustomField from './checkbox.custom-field';
import { Label } from '@/components/ui/label';
import SelectCustomField from './select.custom-field';
import DateCustomField from './date.custom-field';
import TimeCustomField from './time.custom-field';
import TextCustomField from './text.custom-field';
import NumberCustomField from './number.custom-field';

type Props = {
  field: Levelup.CMS.V1.Content.Entity.ICustomMetaField
  value: any;
  onChange: (value: any) => void;
}

// type TCustomField

const CustomMetaField: React.FC<Props> = ({ field, value, onChange }) => {

  return (
    <div className="meta-field">

      <Label className='font-bold'>{field.field_label}</Label>

      <div className="f">

        {field.field_type === 'checkbox' ? (
          <CheckboxCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ) : field.field_type === 'select' ? (
          <SelectCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ): field.field_type === 'date' ? (
          <DateCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ): field.field_type === 'time' ? (
          <TimeCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ): field.field_type === 'text' ? (
          <TextCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ) : field.field_type === 'number' ? (
          <NumberCustomField
            label={field.field_label}
            required={field.field_options.required}
            value={value}
            onChange={onChange}
            options={field.field_options as any}
            default_value={field.field_options.default_value}

          />
        ) : null}
      </div>
    </div>
  );
}


export default CustomMetaField;