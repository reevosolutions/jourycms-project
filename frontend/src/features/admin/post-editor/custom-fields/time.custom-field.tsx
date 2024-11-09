import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import { addLeadingZeros } from "@/lib/utilities/strings";
import { cn } from "@/lib/utils";
import { LuCheck } from "react-icons/lu";

type Props =
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<"time">;

const MINUTES = new Array(60)
  .fill(null)
  .map((n, minute) => addLeadingZeros(minute, 2));
const HOURS = new Array(24)
  .fill(null)
  .map((n, index) => addLeadingZeros(index, 2));

const TimeCustomField: React.FC<Props> = ({
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
  const [hour, setHour] = useState(format(new Date(), "HH"));
  const [minute, setMinute] = useState(format(new Date(), "mm"));
  const [mOpen, setMOpen] = useState(false);
  const [hOpen, setHOpen] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const [h, m] = (value || format(new Date(), "HH:mm")).split(":");
    setHour(h);
    setMinute(m);
  }, [value]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex items-center gap-2 rtl:flex-row-reverse rtl:justify-end">
      <Popover open={hOpen} onOpenChange={setHOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={hOpen}
            className="w-12 justify-between rounded-xxs"
          >
            {hour}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {HOURS.map(hour => (
                  <CommandItem
                    key={hour}
                    value={hour}
                    onSelect={currentValue => {
                      onChange(
                        `${hour}:${addLeadingZeros(parseInt(minute), 2)}`,
                      );
                    }}
                  >
                    {hour}
                    <LuCheck
                      className={cn(
                        "ms-auto",
                        value ===
                          `${hour}:${addLeadingZeros(parseInt(minute), 2)}`
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <span className="font-bold">:</span>
      <Popover open={mOpen} onOpenChange={setMOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={mOpen}
            className="w-12 justify-between rounded-xxs"
          >
            {minute}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {MINUTES.map(minute => (
                  <CommandItem
                    key={minute}
                    value={minute}
                    onSelect={currentValue => {
                      onChange(
                        `${addLeadingZeros(parseInt(hour), 2)}:${minute}`,
                      );
                    }}
                  >
                    {minute}
                    <LuCheck
                      className={cn(
                        "ms-auto",
                        value ===
                          `${addLeadingZeros(parseInt(hour), 2)}:${minute}`
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeCustomField;
