import React from "react";

import { FormControl } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";

type Props =
  // eslint-disable-next-line no-undef
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<"number">;

const NumberCustomField: React.FC<Props> = ({ value, onChange }) => {
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
          type="number"
          className="rounded-md bg-body"
          onChange={event =>
            onChange(Number.parseFloat(event.target.value || "") || null)
          }
          value={`${value || 0}`}
        />
      </FormControl>
    </div>
  );
};

export default NumberCustomField;
