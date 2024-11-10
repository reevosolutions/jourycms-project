import { FormControl } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import React from "react";

type Props =
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<"text">;

const TextCustomField: React.FC<Props> = ({
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
    <div className="">
      <FormControl>

      <Input
          className="rounded-md bg-body"
          onChange={event => onChange(event.target.value || null)}
          value={value || ""}
        />

      </FormControl>
    </div>
  );
};

export default TextCustomField;
