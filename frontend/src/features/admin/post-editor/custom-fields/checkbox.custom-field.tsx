import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/customized.form';
import { Label } from "@/components/ui/label";
import React, { useState, useCallback, useEffect } from 'react';

type Props = Levelup.CMS.V1.UI.Forms.CustomFields.MetaFieldInputProps<'checkbox'>;

const CheckboxCustomField: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  options,
  default_value
}) => {

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [selected, setSelected] = useState<string[]>([]);
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setSelected(value || default_value || []);
  }, [value, default_value]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col gap-2 py-2">
      {options.choices.map((item) => (
        <div key={item.value} className="flex items-center gap-3">
          <FormLabel className="font-normal flex items-center gap-3 w-full cursor-pointer">
            <FormControl >
              <Checkbox
                className="rounded-xxs"
                checked={selected.includes(item.value)}
                onCheckedChange={(checked) => {
                  const value = checked ? [...selected, item.value] : selected.filter((value) => value !== item.value);
                  onChange(value);
                }}
              />
            </FormControl>
            <span>
              {item.label}
            </span>
          </FormLabel>
        </div>
      ))}
    </div>
  );

};


export default CheckboxCustomField;