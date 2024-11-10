import { FormControl } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/customized.switch";
import React from "react";

type Props =
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<"boolean">;

const BooleanCustomField: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  options,
  default_value,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col gap-2 py-2">
      <FormControl>

        <Label className="flex items-center gap-3" >
          <Switch
            checked={value}
            onCheckedChange={() => onChange(!value)}
          />
          <span className="d">{options.label}</span>
        </Label>
      </FormControl>
    </div>
  );
};

export default BooleanCustomField;
