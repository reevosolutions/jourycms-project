import React, { useCallback, useEffect, useState } from "react";
import { LuCheck, LuChevronsUpDown, LuX } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/customized.form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSdk } from "@/hooks/use-sdk";

type Props = Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<
  'article_object',
  boolean
>;

const ArticleObjectCustomField: React.FC<Props> = ({
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
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [articles, setArticles] = useState<{
    [_id: string]: string;
  }>({});

  const [loadedSearches, setLoadedSearches] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const { data, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["articleType", options.type, options.filter, loadedSearches],
    enabled: !!options.type,

    queryFn: async () => {
      if (loadedSearches.includes(search)) return {};

      const data = await sdk.content.articles.list({
        count: 200,
        search: search,
        filters: {
          ...options.filter,
          article_type: options.type,
        },
        fields: ['_id', 'title'],
      });

      const articles: { [_id: string]: string } = {};
      for (const item of (data?.data || [])) {
        articles[item._id] = item.title
      };
      setArticles(old => ({ ...old, ...articles }));
      setLoadedSearches((old) => [...old, search]);

      return {};
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const default_value: any[] = Array.isArray(options.default_value)
      ? options.default_value
      : options.default_value
        ? [options.default_value]
        : [];
    const _value: string[] = Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];
    const selected = _value.length > 0 ? _value : default_value;
    setSelected(selected);
  }, [value, default_value, options.default_value]);

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
          className="w-full justify-between"
        >
          <div className="value">
            {selected.length === 0 ? (
              <span>{"ابحث..."}</span>
            ) : options.multiple ? (
              <div className="flex flex-wrap items-center gap-2">
                {selected.map(item => (
                  <Badge
                    key={item}
                    variant={"secondary"}
                    className="inline-flex items-center gap-2"
                  >
                    <span className="d">
                      {articles[item] || item}
                    </span>
                    <span
                      onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        setSelected(previous => previous.filter(v => v !== item));
                        onChange(selected.filter(v => v !== item));
                      }}
                      className="h-4 w-4 opacity-20 hover:opacity-100 hocus:opacity-100"
                    >
                      <LuX className="h-4 w-4" />
                    </span>
                  </Badge>
                ))}
              </div>
            ) : (
              articles[selected[0]] || selected[0]
            )}
          </div>
          <LuChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="ابحث عن مقال..." />
          <CommandList>
            <CommandEmpty>لا توجد خيارات.</CommandEmpty>
            <CommandGroup>
              {Object.entries(articles).map(([_id, title]) => (
                <CommandItem
                  key={_id}
                  value={_id}
                  onSelect={currentValue => {
                    let value;
                    if (options.multiple)
                      value = selected.includes(_id)
                        ? selected.filter(value => value !== _id)
                        : [...selected, _id];
                    else value = [_id];
                    setSelected(value);
                    onChange(options.multiple ? value : value[0] || null);
                    setOpen(false);
                  }}
                >
                  {title}
                  <LuCheck
                    className={cn(
                      "ms-auto",
                      (typeof value === "string" && value === _id) ||
                        value?.includes(_id)
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
  );
};

export default ArticleObjectCustomField;
