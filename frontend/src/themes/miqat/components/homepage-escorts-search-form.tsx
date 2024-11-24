import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { LuCheck, LuChevronsUpDown, LuSearch } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import { Slider } from "@/components/ui/customized.slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCMSContent from "@/hooks/use-cms-content";
import { cn } from "@/lib/utils";
import { checkSimilarity } from "@/lib/utilities/strings";

export const EscortsSearchForm: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { getWebsiteConfigValue } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */
  const states = useMemo(
    () => getWebsiteConfigValue("states", []),
    [getWebsiteConfigValue],
  );
  const cities = useMemo(
    () => getWebsiteConfigValue("cities", []),
    [getWebsiteConfigValue],
  );
  const [wilayaOpen, setWilayaOpen] = useState(false);
  const [state, setState] = useState<string | undefined>();
  const [experianceRange, setExperianceRange] = useState<number[]>([2, 5]);
  const [sex, setSex] = useState<"male" | "female" | undefined>();

  useEffect(() => {
    console.log(sex);
  }, [sex]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="d pt-6 text-darkblue-950">
      {/* field */}
      <div className="field mb-8">
        <Label className="text-2xl text-darkblue-500">{"جنس المرافق"}</Label>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-8">
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === "male"
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex("male")}
            aria-label="male"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 453.4 453.4"
              className="fill-current"
            >
              <path d="M316 267c11-9 17-23 17-38v-13c22-4 38-23 38-47 0-16-10-30-24-35v-14a120 120 0 0 0-240 0v14c-15 5-25 19-25 35 0 24 17 43 38 47v13c0 15 7 29 17 38-28 26-45 62-45 101v76c0 5 4 9 9 9h251c5 0 9-4 9-9v-76a133 133 0 0 0-45-101zm-89 100-80-84 6-6 67 71a9 9 0 0 0 13 0l67-71 6 6-79 84zm0-69c9 0 17-1 26-4l11-4-37 39-37-39 11 4c8 3 17 4 26 4zm20-21-11 3v-18a9 9 0 0 0-18 0v18l-11-3-46-16c-14-5-22-18-22-32v-77c0-13 3-26 9-36a41 41 0 0 1 37-24l14 2c18 4 37 4 55 0 13-3 24-2 33 3 7 4 13 10 18 19 7 10 10 23 10 36v77c0 14-9 27-22 32l-46 16zm106-108c0 14-8 25-20 28v-48c11 0 20 9 20 20zm-253 0c0-11 9-20 21-20l-1 3v45c-11-3-20-14-20-28zm32-62c-3 5-6 11-7 18v-5a102 102 0 0 1 204 0v5c-2-7-5-13-8-18a61 61 0 0 0-71-31c-15 4-31 4-46 0-31-7-56 4-72 31zm-22 261c0-27 9-52 25-72l83 88v51H110v-67zm233 67H236v-51l82-88c16 20 25 45 25 72v67z" />
              <path d="m268 201-4 3c-2 1-5 1-7-1l-1-1a23 23 0 0 0-29-4 23 23 0 0 0-30 4l-1 1c-1 2-4 2-6 1l-5-3a9 9 0 0 0-10 15l4 3a23 23 0 0 0 31-4v-1l5-1c1 0 3 0 4 2a9 9 0 0 0 15 0c2-2 4-2 5-2l4 1 1 1c7 9 20 10 30 4l4-3a9 9 0 0 0-10-15z" />
            </svg>
          </button>
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === "female"
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex("female")}
            aria-label="female"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
              className="fill-current"
            >
              <path d="M227 142h-22a8 8 0 1 0 0 16h14a8 8 0 0 0 16-3v-5c0-5-3-8-8-8zm80 0h-22c-5 0-8 3-8 8v5a8 8 0 0 0 16 3h14a8 8 0 1 0 0-16zm-30 49c-5-1-9 1-11 5a11 11 0 0 1-20 0 8 8 0 0 0-16 6 27 27 0 0 0 52 0c1-5-1-9-5-11z" />
              <path d="M396 371c6-16 10-34 10-52V150a150 150 0 0 0-300 0v169c0 18 4 36 10 52-35 36-53 83-53 133a8 8 0 1 0 16 0c0-44 15-85 44-117a150 150 0 0 0 266 0c29 32 44 73 44 117a8 8 0 1 0 16 0c0-50-18-97-53-133zm-7-52a133 133 0 0 1-23 75c-88-2-164-58-196-137a117 117 0 0 0 203-80v-27a117 117 0 0 0-99-116 8 8 0 1 0-3 16c35 5 63 28 77 59H164c14-31 42-54 77-59a8 8 0 1 0-3-16 117 117 0 0 0-99 116v27a232 232 0 0 0 215 232 133 133 0 0 1-221-39c-7-16-10-33-10-51V150a134 134 0 0 1 266 0v169zM155 177v-27c0-9 1-17 3-25h196c2 8 3 16 3 25v27a101 101 0 0 1-202 0z" />
              <circle cx="302.3" cy="340.4" r="8.2" />
              <circle cx="335" cy="307.7" r="8.2" />
            </svg>
          </button>
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === undefined
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex(undefined)}
          >
            <span className="text-2xl font-bold">أي شخص</span>
          </button>
        </div>
      </div>
      {/* field */}
      <div className="field mb-8">
        <Label className="text-2xl text-darkblue-500">{"الولاية"}</Label>
        <Popover open={wilayaOpen} onOpenChange={setWilayaOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={wilayaOpen}
              className="w-full justify-between rounded-md border-2"
              aria-label="state"
            >
              <div className="value text-xl">
                {!state ? (
                  <span className="text-darkblue-500">{"اختر ولاية..."}</span>
                ) : (
                  <span>
                    {states?.find(item => item.code === state)?.name || ""}
                  </span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[220px] sm:w-[436px] p-0 font-hammah text-2xl"
            align="start"
          >
            <Command
              filter={(value, search, keywords) => {
                const name = states?.find(s => s.code === value)?.name;
                const similarity = checkSimilarity(search, `${value} ${name}` || '');
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
      </div>
      {/* field */}
      <div className="field mb-12">
        <Label className="text-2xl text-darkblue-500">{"سنوات الخبرة"}</Label>
        <div className="mb-10 mt-4">
          <Slider
            inverted
            minStepsBetweenThumbs={2}
            defaultValue={experianceRange}
            min={0}
            max={20}
            step={1}
            value={experianceRange}
            onValueChange={setExperianceRange}
            tooltip={value => (
              <span dir="rtl" className="bg-white">
                {value === 1 ? "سنة" : value === 2 ? "سنتين" : `${value} سنة`}
              </span>
            )}
          ></Slider>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button className="flex w-full items-center gap-4 rounded-lg bg-darkblue-900 px-8 py-3 text-2xl text-white transition-all duration-200 hocus:bg-darkblue-700 hocus:shadow-md hocus:shadow-darkblue-950">
          <LuSearch className="h-6 w-6" />
          <span className="block flex-grow px-2 sm:pe-12 text-center">
            العثور على مرافقين
          </span>
        </button>
      </div>
    </div>
  );
};

export const DoctorsSearchForm: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { getWebsiteConfigValue } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */
  const specialities = useMemo(
    () => getWebsiteConfigValue('medical_specialities', []),
    [getWebsiteConfigValue],
  );
  const [specialityOpen, setSpecialityOpen] = useState(false);
  const [sex, setSex] = useState<"male" | "female" | undefined>();
  const [speciality, setSpeciality] = useState<string | undefined>();
  const [experianceRange, setExperianceRange] = useState<number[]>([0, 5]);

  useEffect(() => {
    console.log(sex);
  }, [sex]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="d pt-6 text-darkblue-950" dir="rtl">
      {/* field */}
      <div className="field mb-8">
        <Label className="text-2xl text-darkblue-500">{"جنس الطبيب"}</Label>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-8">
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === "male"
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex("male")}
            aria-label="male"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 453.4 453.4"
              className="fill-current"
            >
              <path d="M316 267c11-9 17-23 17-38v-13c22-4 38-23 38-47 0-16-10-30-24-35v-14a120 120 0 0 0-240 0v14c-15 5-25 19-25 35 0 24 17 43 38 47v13c0 15 7 29 17 38-28 26-45 62-45 101v76c0 5 4 9 9 9h251c5 0 9-4 9-9v-76a133 133 0 0 0-45-101zm-89 100-80-84 6-6 67 71a9 9 0 0 0 13 0l67-71 6 6-79 84zm0-69c9 0 17-1 26-4l11-4-37 39-37-39 11 4c8 3 17 4 26 4zm20-21-11 3v-18a9 9 0 0 0-18 0v18l-11-3-46-16c-14-5-22-18-22-32v-77c0-13 3-26 9-36a41 41 0 0 1 37-24l14 2c18 4 37 4 55 0 13-3 24-2 33 3 7 4 13 10 18 19 7 10 10 23 10 36v77c0 14-9 27-22 32l-46 16zm106-108c0 14-8 25-20 28v-48c11 0 20 9 20 20zm-253 0c0-11 9-20 21-20l-1 3v45c-11-3-20-14-20-28zm32-62c-3 5-6 11-7 18v-5a102 102 0 0 1 204 0v5c-2-7-5-13-8-18a61 61 0 0 0-71-31c-15 4-31 4-46 0-31-7-56 4-72 31zm-22 261c0-27 9-52 25-72l83 88v51H110v-67zm233 67H236v-51l82-88c16 20 25 45 25 72v67z" />
              <path d="m268 201-4 3c-2 1-5 1-7-1l-1-1a23 23 0 0 0-29-4 23 23 0 0 0-30 4l-1 1c-1 2-4 2-6 1l-5-3a9 9 0 0 0-10 15l4 3a23 23 0 0 0 31-4v-1l5-1c1 0 3 0 4 2a9 9 0 0 0 15 0c2-2 4-2 5-2l4 1 1 1c7 9 20 10 30 4l4-3a9 9 0 0 0-10-15z" />
            </svg>
          </button>
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === "female"
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex("female")}
            aria-label="female"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
              className="fill-current"
            >
              <path d="M227 142h-22a8 8 0 1 0 0 16h14a8 8 0 0 0 16-3v-5c0-5-3-8-8-8zm80 0h-22c-5 0-8 3-8 8v5a8 8 0 0 0 16 3h14a8 8 0 1 0 0-16zm-30 49c-5-1-9 1-11 5a11 11 0 0 1-20 0 8 8 0 0 0-16 6 27 27 0 0 0 52 0c1-5-1-9-5-11z" />
              <path d="M396 371c6-16 10-34 10-52V150a150 150 0 0 0-300 0v169c0 18 4 36 10 52-35 36-53 83-53 133a8 8 0 1 0 16 0c0-44 15-85 44-117a150 150 0 0 0 266 0c29 32 44 73 44 117a8 8 0 1 0 16 0c0-50-18-97-53-133zm-7-52a133 133 0 0 1-23 75c-88-2-164-58-196-137a117 117 0 0 0 203-80v-27a117 117 0 0 0-99-116 8 8 0 1 0-3 16c35 5 63 28 77 59H164c14-31 42-54 77-59a8 8 0 1 0-3-16 117 117 0 0 0-99 116v27a232 232 0 0 0 215 232 133 133 0 0 1-221-39c-7-16-10-33-10-51V150a134 134 0 0 1 266 0v169zM155 177v-27c0-9 1-17 3-25h196c2 8 3 16 3 25v27a101 101 0 0 1-202 0z" />
              <circle cx="302.3" cy="340.4" r="8.2" />
              <circle cx="335" cy="307.7" r="8.2" />
            </svg>
          </button>
          <button
            className={cn(
              "flex aspect-square items-center justify-center rounded-4xl border-2 bg-slate-100 transition-all",
              sex === undefined
                ? "border-orange-600 text-orange-600"
                : "border-slate-100 text-darkblue-500",
            )}
            onClick={() => setSex(undefined)}
          >
            <span className="text-2xl font-bold">أي شخص</span>
          </button>
        </div>
      </div>
      {/* field */}
      <div className="field mb-8">
        <Label className="text-2xl text-darkblue-500">{"التخصص"}</Label>
        <Popover open={specialityOpen} onOpenChange={setSpecialityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={specialityOpen}
              className="w-full justify-between rounded-md border-2"
              aria-label="state"
            >
              <div className="value text-xl">
                {!speciality ? (
                  <span className="text-darkblue-500">{"اختر التخصص..."}</span>
                ) : (
                  <span>
                    {specialities?.find(item => item.value === speciality)
                      ?.label || ""}
                  </span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[220px] p-0 font-hammah text-2xl sm:w-[436px]"
            align="start"
          >
            <Command
              filter={(value, search, keywords) => {
                const name = specialities?.find(s => s.value === value)?.label;
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
                  {specialities?.map(item => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={value => {
                        setSpeciality(value);
                        setSpecialityOpen(false);
                      }}
                      className="text-xl"
                    >
                      {item.label}
                      <LuCheck
                        className={cn(
                          "ms-auto",
                          item.value === speciality
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
      <div className="field mb-12">
        <Label className="text-2xl text-darkblue-500">{"سنوات الخبرة"}</Label>
        <div className="mb-10 mt-4">
          <Slider
            inverted
            minStepsBetweenThumbs={2}
            defaultValue={experianceRange}
            min={0}
            max={20}
            step={1}
            value={experianceRange}
            onValueChange={setExperianceRange}
            tooltip={value => (
              <span dir="rtl" className="bg-white">
                {value === 1 ? "سنة" : value === 2 ? "سنتين" : `${value} سنة`}
              </span>
            )}
          ></Slider>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button className="flex w-full items-center gap-4 rounded-lg bg-darkblue-900 px-8 py-3 text-2xl text-white transition-all duration-200 hocus:bg-darkblue-700 hocus:shadow-md hocus:shadow-darkblue-950">
          <LuSearch className="h-6 w-6" />
          <span className="block flex-grow px-2 pe-12 text-center">
            العثور على أطباء
          </span>
        </button>
      </div>
    </div>
  );
};

export type HomepageEscortsSearchFormProps = JouryCMS.Theme.ComponentProps & {};

const HomepageEscortsSearchForm: React.FC<
  HomepageEscortsSearchFormProps
> = ({ }) => {
  return (
    <div className="jcms-hero-section min-h-[600px] w-full lg:w-[500px] rounded-4xl bg-darkblue-950 shadow-lg shadow-darkblue-900/10 transition-all">
      <Tabs defaultValue="escorts" className="w-full">
        <TabsList
          className="h-auto w-full items-center justify-center gap-12 md:gap-20 bg-transparent"
          dir="rtl"
        >
          <TabsTrigger
            className="group relative bg-transparent px-4 py-4 text-4xl text-slate-100 transition-all data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-white data-[state=active]:shadow-none hover:text-white active:bg-transparent"
            value="escorts"
          >
            <span>مرافقين</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
          <TabsTrigger
            className="group relative bg-transparent px-4 py-4 text-4xl text-slate-100 transition-all data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-white data-[state=active]:shadow-none hover:text-white active:bg-transparent"
            value="doctors"
          >
            <span>أطباء</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="escorts" dir="rtl">
          <div className="min-h-[560px] rounded-4xl bg-white p-4 px-4 md:px-8">
            <EscortsSearchForm />
          </div>
        </TabsContent>
        <TabsContent value="doctors">
          <div className="min-h-[560px] rounded-4xl bg-white p-4 px-4 md:px-8">
            <DoctorsSearchForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomepageEscortsSearchForm;
