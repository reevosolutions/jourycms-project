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

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover"
import { LuCheck, LuChevronsUpDown, LuX } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";


type Props = Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<'select', boolean>;

const SelectCustomField: React.FC<Props> = ({
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
  const [open, setOpen] = React.useState(false)

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const default_value: any[] = Array.isArray(options.default_value) ? options.default_value : options.default_value ? [options.default_value] : [];
    const _value: string[] = Array.isArray(value) ? value : value ? [value] : [];
    const selected = _value.length ? _value : default_value;
    setSelected(selected);
  }, [value, default_value]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-xxs"
        >
          <div className="value">
            {!selected.length ? <span>{"Search option..."}</span>
              : options.multiple ? (
                <div className="flex gap-2 flex-wrap items-center">
                  {selected.map(item => (
                    <Badge key={item} variant={'secondary'} className="inline-flex gap-2 items-center">
                      <span className="d">
                        {
                          options.choices.find(o => o.value === item)?.label || item
                        }
                      </span>
                      <span
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setSelected(prev => prev.filter(v => v !== item))
                          onChange(selected.filter(v => v !== item))
                        }}
                        className="w-4 h-4 opacity-20 hocus:opacity-100 hover:opacity-100"
                      ><LuX className="w-4 h-4" /></span>
                    </Badge>
                  ))}
                </div>
              ) : options.choices.find(o => o.value === selected[0])?.label || selected[0]}
          </div>
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>

              {options.choices.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    let value;
                    if (options.multiple)
                      value = selected.includes(item.value) ? selected.filter((value) => value !== item.value) : [...selected, item.value];
                    else
                      value = [item.value];
                    setSelected(value);
                    onChange(options.multiple ? value : value[0] || null);
                    setOpen(false)
                  }}
                >
                  {item.label}
                  <LuCheck
                    className={cn(
                      "ms-auto",
                      (typeof value === 'string' && value === item.value) || value?.includes(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

};


export default SelectCustomField;