"use client";
/* eslint-disable no-undef */
import {
  useSpring,
  animated,
  useSprings,
  useTransition,
} from "@react-spring/web";
import {Switch} from "@/components/ui/customized.switch";
import Image from "next/image";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  LuCheck,
  LuChevronsUpDown,
  LuHelpCircle,
  LuSearch,
} from "react-icons/lu";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {FormControl, FormLabel} from "@/components/ui/customized.form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import {Slider} from "@/components/ui/customized.slider";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import useCMSContent from "@/hooks/use-cms-content";
import {cn} from "@/lib/utils";
import initLogger, {LoggerContext} from "@/lib/logging";
import {checkSimilarity} from "@/lib/utilities/strings";
import Pattern from "./pattern";
import {ArticleTypeSlug, TArticleTypeSlug} from "../config";
import {useRouter} from "next/navigation";
import qs from "querystringify";
import {CustomFilterParams} from "../data";
import {useQuery} from "@tanstack/react-query";
import {useSdk} from "@/hooks/use-sdk";

const logger = initLogger(LoggerContext.COMPONENT, "select.custom-field");

const services: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [
  {
    value: "transportation",
    label: "خدمة النقل",
  },
  {
    value: "with_kids",
    label: "تنوي السفر برفقة الأطفال",
  },
  {
    value: "shrines",
    label: "خدمة الزيارات",
  },
  {
    value: "proximity_to_the_holy_mosque",
    label: "القرب من الحرم المكي",
  },
];

const entry_points = [
  {
    value: "mekkah",
    label: "مكة المكرمة",
  },
  {
    value: "medina",
    label: "المدينة المنورة",
  },
];

const program_types = [
  {
    value: "economy",
    label: "اقتصادي",
  },
  {
    value: "normal",
    label: "عادي",
  },
  {
    value: "premium",
    label: "مميز",
  },
  {
    value: "deluxe",
    label: "فاخر",
  },
];

const trip_types = [
  {
    value: "direct",
    label: "مباشرة",
  },
  {
    value: "indirect",
    label: "غير مباشرة",
  },
];
const payment_modes = [
  {
    value: "cash",
    label: "كاش",
  },
  {
    value: "installment",
    label: "بالتقسيط",
  },
];
const distance_to_haram_options = [
  {
    value: "500-700",
    label: "من 500 إلي 700",
  },
  {
    value: "700-900",
    label: "من 700 إلي 900",
  },
  {
    value: "",
    label: "لا يهم",
  },
];

export const OmrahSearchForm: React.FC<{
  type: TArticleTypeSlug;
}> = ({type}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {getWebsiteConfigValue, getArticleTypeBySlug} = useCMSContent();
  const router = useRouter();
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */
  const [durations, setDurations] = useState<
    Levelup.CMS.V1.Content.CustomFields.MetaField<"select">["field_options"]["choices"]
  >([]);
  const states = useMemo(
    () => getWebsiteConfigValue("states", []),
    [getWebsiteConfigValue],
  );
  const cities = useMemo(
    () => getWebsiteConfigValue("cities", []),
    [getWebsiteConfigValue],
  );
  const months = useMemo(
    () => getWebsiteConfigValue("months", []),
    [getWebsiteConfigValue],
  );
  // dropdown open state
  const [wilayaOpen, setWilayaOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [entryPointOpen, setEntryPointOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [agencyOpen, setAgencyOpen] = useState(false);
  const [agencySearch, setAgencySearch] = useState("");
  const [agencies, setAgencies] = useState<{
    [_id: string]: string;
  }>({});
  const [loadedAgencySearches, setLoadedAgencySearches] = useState<string[]>(
    [],
  );
  const [programTypeOpen, setProgramTypeOpen] = useState(false);
  const [distanceToHaramOpen, setDistanceToHaramOpen] = useState(false);
  const [tripTypeOpen, setTripTypeOpen] = useState(false);
  const [paymentModeOpen, setPaymentModeOpen] = useState(false);

  // form data
  const [agency, setAgency] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([12, 50]);
  const [entry_point, setEntry_point] = useState<string | null>(null);
  const [program_type, setProgram_type] = useState<string | null>(null);
  const [payment_mode, setPayment_mode] = useState<string | null>(null);
  const [distance_to_haram, setDistance_to_haram] = useState<string | null>(
    null,
  );
  const [trip_type, setTrip_type] = useState<string | null>(null);
  const [ramadhan_omrah, setRamadhan_omrah] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: ["agencies", loadedAgencySearches, agencySearch],
    queryFn: async () => {
      if (loadedAgencySearches.includes(agencySearch)) return {};

      const data = await sdk.content.articles.list({
        count: 200,
        search: agencySearch,
        filters: {
          article_type: ArticleTypeSlug.AGENCY,
        },
        fields: ["_id", "title"],
      });

      const articles: {[_id: string]: string} = {};
      for (const item of data?.data || []) {
        articles[item._id] = item.title;
      }
      setAgencies(old => ({...old, ...articles}));
      setLoadedAgencySearches(old => [...old, agencySearch]);
      return {};
    },
  });

  const loadDurations = useCallback(async () => {
    const type = await getArticleTypeBySlug(ArticleTypeSlug.OMRAH);
    const durations = (
      type?.custom_meta_fields?.find(
        field => field.field_key === "trip_duration",
      ) as Levelup.CMS.V1.Content.CustomFields.MetaField<"select"> | undefined
    )?.field_options?.choices;
    setDurations(durations || []);
  }, [getArticleTypeBySlug]);

  const handleSubmit = useCallback(async () => {
    const searchObject: CustomFilterParams = {
      t: "omrah",
      w: state || undefined,
      c: city || undefined,
      m: month || undefined,
      d: duration || undefined,
      s: selectedServices,
      pn: (priceRange[0] || 0) * 10_000,
      px: (priceRange[1] || 60) * 10_000,
    };
    const path = `/search?${qs.stringify(searchObject)}`;
    logger.value("path", path);
    router.push(path);
  }, [city, duration, month, priceRange, router, selectedServices, state]);
  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadDurations();
  }, [loadDurations]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="d text-darkblue-950">
      {/* field */}
      <div className="field mb-4">
        <Label className="text-base text-darkblue-500">{"الوكالة"}</Label>
        <div className="d">
          <Popover open={agencyOpen} onOpenChange={setAgencyOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={agencyOpen}
                className="w-full justify-between"
              >
                <div className="value pt-1 text-lg">
                  {!agency ? <span>{"ابحث..."}</span> : agencies[agency]}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command
                filter={(value, search, keywords) => {
                  setAgencySearch(search);
                  const label = agencies[value];
                  const similarity = checkSimilarity(
                    search,
                    `${value} ${label || ""}`,
                  );
                  return similarity;
                }}
              >
                <CommandInput placeholder="ابحث عن وكالة..." />
                <CommandList>
                  <CommandEmpty>لا توجد خيارات.</CommandEmpty>
                  <CommandGroup>
                    {Object.entries(agencies).map(([_id, title]) => (
                      <CommandItem
                        key={_id}
                        value={_id}
                        onSelect={currentValue => {
                          let value;
                          value = [_id];
                          setAgency(currentValue);
                          setAgencyOpen(false);
                        }}
                      >
                        {title}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            agency === _id ? "opacity-100" : "opacity-0",
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
      </div>

      {/* field */}
      {/* <div className="field mb-4">
        <Label className="text-base text-darkblue-500">{"الولاية"}</Label>
        <Popover open={wilayaOpen} onOpenChange={setWilayaOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={wilayaOpen}
              className="w-full justify-between rounded-md border-2"
              aria-label="state"
            >
              <div className="value text-lg pt-1">
                {!state ? (
                  <span className="text-darkblue-500">{"اختر ولاية..."}</span>
                ) : (
                  <span>
                    {states?.find(index => index.code === state)?.name || ""}
                  </span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[220px] p-0 font-tajawal text-2xl sm:w-[436px]"
            align="start"
          >
            <Command
              filter={(value, search, keywords) => {
                const name = states?.find(s => s.code === value)?.name;
                const similarity = checkSimilarity(
                  search,
                  `${value} ${name}` || "",
                );
                return similarity;
              }}
            >
              <CommandInput className="text-xl" placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                  لا توجد خيارات.
                </CommandEmpty>
                <CommandGroup>
                  {states?.map(item => (
                    <CommandItem
                      key={item.code}
                      value={item.code}
                      onSelect={value => {
                        setState(value);
                        setCity(null);
                        setWilayaOpen(false);
                      }}
                      className="text-xl"
                    >
                      <span className="inline-block text-darkblue-400">
                        {item.code}
                      </span>
                      {item.name}
                      <LuCheck
                        className={cn(
                          "ms-auto",
                          item.code === state ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div> */}
      {/* field */}
      {/* <div className="field mb-4">
        <Label className="text-base text-darkblue-500">{"البلدية"}</Label>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              className="w-full justify-between rounded-md border-2"
              aria-label="city"
            >
              <div className="value text-lg pt-1">
                {!city ? (
                  <span className="text-darkblue-500">{"اختر بلدية..."}</span>
                ) : (
                  <span>
                    {cities?.find(index => index.code === city)?.name || ""}
                  </span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[220px] p-0 font-tajawal text-2xl sm:w-[436px]"
            align="start"
          >
            <Command
              filter={(value, search, keywords) => {
                const name = cities?.find(s => s.code === value)?.name;
                const similarity = checkSimilarity(search, name || "");
                return similarity;
              }}
            >
              <CommandInput className="text-xl" placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                  لا توجد خيارات.
                </CommandEmpty>
                <CommandGroup>
                  {cities
                    ?.filter(item => item.state_code === state)
                    .map(item => (
                      <CommandItem
                        key={item.code}
                        value={item.code}
                        onSelect={value => {
                          setCity(value);
                          setCityOpen(false);
                        }}
                        className="text-xl"
                      >
                        {item.name}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.code === state ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div> */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
        {/* field */}
        {/* <div className="field mb-4">
          <Label className="text-base text-darkblue-500">{"شهر الانطلاق"}</Label>
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={monthOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="month"
              >
                <div className="value text-lg pt-1">
                  {!month ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>{months?.[Number.parseInt(month)] || ""}</span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {Object.entries(months || {}).map(([value, label]) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={value => {
                          setMonth(value);
                          setMonthOpen(false);
                        }}
                        className="text-xl"
                      >
                        {label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            value === month ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div> */}
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">
            {type === "omrah" ? "عدد أيام العمرة" : "عدد أيام الحج"}
          </Label>
          <Popover open={durationOpen} onOpenChange={setDurationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={durationOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="duration"
              >
                <div className="value pt-1 text-lg">
                  {!duration ? (
                    <span className="text-darkblue-500">{"اختر مدة..."}</span>
                  ) : (
                    <span>
                      {durations?.find(index => index.value === duration)
                        ?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {durations?.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={value => {
                          setDuration(value);
                          setDurationOpen(false);
                        }}
                        className="text-xl"
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === duration
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
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">{"الدخول"}</Label>
          <Popover open={entryPointOpen} onOpenChange={setEntryPointOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={entryPointOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="entry"
              >
                <div className="value pt-1 text-lg">
                  {!entry_point ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>
                      {entry_points.find(ep => ep.value === entry_point)
                        ?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {entry_points.map(({value, label}) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={value => {
                          setEntry_point(value);
                          setEntryPointOpen(false);
                        }}
                        className="text-xl"
                      >
                        {label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            value === entry_point ? "opacity-100" : "opacity-0",
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
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">
            {"نوع البرنامج"}
          </Label>
          <Popover open={programTypeOpen} onOpenChange={setProgramTypeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={programTypeOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="duration"
              >
                <div className="value pt-1 text-lg">
                  {!program_type ? (
                    <span className="text-darkblue-500">
                      {"اختر نوع البرنامج..."}
                    </span>
                  ) : (
                    <span>
                      {program_types?.find(item => item.value === program_type)
                        ?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {program_types?.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={value => {
                          setProgram_type(value);
                          setProgramTypeOpen(false);
                        }}
                        className="text-xl"
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === program_type
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
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">{"نوع الرحلة"}</Label>
          <Popover open={tripTypeOpen} onOpenChange={setTripTypeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={tripTypeOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="trip"
              >
                <div className="value pt-1 text-lg">
                  {!trip_type ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>
                      {trip_types.find(item => item.value === trip_type)
                        ?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {trip_types.map(({value, label}) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={value => {
                          setTrip_type(value);
                          setTripTypeOpen(false);
                        }}
                        className="text-xl"
                      >
                        {label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            value === trip_type ? "opacity-100" : "opacity-0",
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
      </div>
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">
            {"القرب من الحرم المكي"}
          </Label>
          <Popover
            open={distanceToHaramOpen}
            onOpenChange={setDistanceToHaramOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={distanceToHaramOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="duration"
              >
                <div className="value pt-1 text-lg">
                  {!distance_to_haram ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>
                      {distance_to_haram_options?.find(
                        item => item.value === distance_to_haram,
                      )?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {distance_to_haram_options?.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={value => {
                          setDistance_to_haram(value);
                          setDistanceToHaramOpen(false);
                        }}
                        className="text-xl"
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === distance_to_haram
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
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">{"طريقة الدفع"}</Label>
          <Popover open={paymentModeOpen} onOpenChange={setPaymentModeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={paymentModeOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="trip"
              >
                <div className="value pt-1 text-lg">
                  {!payment_mode ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>
                      {payment_modes.find(item => item.value === payment_mode)
                        ?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {payment_modes.map(({value, label}) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={value => {
                          setPayment_mode(value);
                          setPaymentModeOpen(false);
                        }}
                        className="text-xl"
                      >
                        {label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            value === payment_mode
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
      </div>
      {/* <div className="field mb-4">
        <p className="d flex items-center gap-3 text-text-500">
          <LuHelpCircle className="h-4 w-4" />
          <span className="dd">ماذا تفضل أن يكون متوفرا في العرض؟</span>
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {services.map(item => (
            <FormLabel
              key={item.value}
              className="flex w-full cursor-pointer items-center gap-3 font-normal"
            >
              <FormControl>
                <Checkbox
                  className="rounded-full border-orange-400 data-[state=checked]:bg-orange-400"
                  checked={selectedServices.includes(item.value)}
                  onCheckedChange={checked => {
                    const value = checked
                      ? [...selectedServices, item.value]
                      : selectedServices.filter(value => value !== item.value);
                    setSelectedServices(value);
                  }}
                  accessKey={item.label}
                  title={item.label}
                />
              </FormControl>
              <span className="text-xl">{item.label}</span>
            </FormLabel>
          ))}
        </div>
      </div> */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
        {/* field */}
        <div className="field mb-4">
          <Label className="text-base text-darkblue-500">
            {"شهر الانطلاق"}
          </Label>
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={monthOpen}
                className="w-full justify-between rounded-md border-2"
                aria-label="month"
              >
                <div className="value pt-1 text-lg">
                  {!month ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>{months?.[Number.parseInt(month)] || ""}</span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-tajawal text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {Object.entries(months || {}).map(([value, label]) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={value => {
                          setMonth(value);
                          setMonthOpen(false);
                        }}
                        className="text-xl"
                      >
                        {label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            value === month ? "opacity-100" : "opacity-0",
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
        {/* field */}
        {type === "omrah" && (
          <div className="field mb-4">
            <div className="block h-7 w-full text-base text-darkblue-500"></div>
            <Label className="flex h-10 items-center gap-3">
              <Switch
                checked={ramadhan_omrah}
                onCheckedChange={() => setRamadhan_omrah(!ramadhan_omrah)}
                className="data-[state=checked]:bg-orange-400"
              />
              <span className="text-xl">{"عمرة رمضان"}</span>
            </Label>
          </div>
        )}
      </div>

      <div className="field mb-0">
        <p className="d mb-2 flex items-center gap-3 text-text-500">
          <LuHelpCircle className="h-4 w-4" />
          <span className="dd">حدد ميزانيتك </span>
        </p>
        <div className="mb-10">
          <Slider
            tooltip={value => <span dir="ltr">{value} M</span>}
            inverted
            minStepsBetweenThumbs={5}
            defaultValue={priceRange}
            min={10}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
          ></Slider>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button
          className="flex items-center gap-4 rounded-lg bg-red2-800 px-4 py-3 text-2xl text-white transition-all duration-200 hocus:bg-red2-950 hocus:shadow-md hocus:shadow-beige-500"
          onClick={() => handleSubmit()}
        >
          <LuSearch className="h-6 w-6" />
          <span className="block px-2">
            {type === "omrah" ? "العثور على عروض عمرة" : "العثور على عروض حج"}
          </span>
        </button>
      </div>
    </div>
  );
};

export const Placeholder = () => {
  return (
    <div className="relative min-h-[560px] rounded-4xl bg-white p-4 px-8">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="opacity-20">
          <Pattern width={200} color="#c6a789" />
        </span>
      </div>
    </div>
  );
};
export const AnimatedPlaceholder = animated(Placeholder);

// eslint-disable-next-line no-undef
export type HomepageSearchFormProps = JouryCMS.Theme.ComponentProps & {};

const HomepageSearchForm: React.FC<HomepageSearchFormProps> = ({}) => {
  const [springs, api] = useSprings(3, () => ({
    from: {opacity: 0.5, y: "-6%"},
    to: {opacity: 1, y: 0},
  }));
  const [tab, setTab] = useState("omrah");

  const omrahTransitions = useTransition(tab === "omrah", {
    from: {opacity: 1, transform: "translateX(0px)"}, // Starting state
    enter: {opacity: 1, transform: "translateX(0px)"}, // Ending state on mount
    leave: {opacity: 0, transform: "translateX(20px)"}, // Ending state on unmount
    config: {tension: 200, friction: 20}, // Custom animation configuration
  });
  const hajjTransitions = useTransition(tab === "hajj", {
    from: {opacity: 0.5, transform: "translateX(-20px)"}, // Starting state
    enter: {opacity: 1, transform: "translateX(0px)"}, // Ending state on mount
    leave: {opacity: 0, transform: "translateX(20px)"}, // Ending state on unmount
    config: {tension: 200, friction: 20}, // Custom animation configuration
  });
  const tombolasTransitions = useTransition(tab === "tombolas", {
    from: {opacity: 0.5, transform: "translateX(-20px)"}, // Starting state
    enter: {opacity: 1, transform: "translateX(0px)"}, // Ending state on mount
    leave: {opacity: 0, transform: "translateX(20px)"}, // Ending state on unmount
    config: {tension: 200, friction: 20}, // Custom animation configuration
  });

  logger.value("springs", springs);
  return (
    <div className="jcms-hero-section min-h-[600px] w-full rounded-4xl bg-beige-50 shadow-lg shadow-darkblue-900/10 transition-all sm:w-[500px]">
      <Tabs defaultValue="omrah" className="w-full" onValueChange={setTab}>
        <TabsList className="h-auto w-full items-center justify-around bg-transparent">
          <TabsTrigger
            className="group relative bg-transparent px-2 py-4 pt-6 text-xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent sm:text-2xl md:px-4 md:text-2xl"
            value="tombolas"
          >
            <span>طمبولات</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
          <TabsTrigger
            className="group relative bg-transparent px-2 py-4 pt-6 text-xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent sm:text-2xl md:px-4 md:text-2xl"
            value="hajj"
          >
            <span>عروض الحج</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
          <TabsTrigger
            className="group relative bg-transparent px-2 py-4 pt-6 text-xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent sm:text-2xl md:px-4 md:text-2xl"
            value="omrah"
          >
            <span>عروض العمرة</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="omrah" dir="rtl">
          {omrahTransitions((style, item) =>
            item ? (
              <animated.div
                style={style}
                className="min-h-[560px] rounded-4xl bg-white p-4 px-8"
              >
                <OmrahSearchForm type="omrah" />
              </animated.div>
            ) : null,
          )}
        </TabsContent>
        <TabsContent value="hajj" dir="rtl">
          {hajjTransitions((style, item) =>
            item ? (
              <animated.div
                style={style}
                className="min-h-[560px] rounded-4xl bg-white p-4 px-8"
              >
                <OmrahSearchForm type="hajj" />
              </animated.div>
            ) : null,
          )}
        </TabsContent>
        <TabsContent value="tombolas">
          {tombolasTransitions((style, item) =>
            item ? (
              <animated.div
                style={style}
                className="min-h-[560px] rounded-4xl bg-white p-4 px-8"
              >
                <Placeholder />
              </animated.div>
            ) : null,
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomepageSearchForm;
