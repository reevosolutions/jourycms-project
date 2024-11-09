import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
import {
  LuCheck,
  LuChevronsUpDown,
  LuHelpCircle,
  LuSearch,
  LuX,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { FormControl, FormLabel } from "@/components/ui/customized.form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/customized.slider";

type State = {
  code: string;
  name: string;
};
type City = {
  state_code: string;
  code: string;
  name: string;
};

const states: State[] = [];
const cities: City[] = [];
const months: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [];
const durations: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [];
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

export const OmrahSearchForm: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATE                                    */
  /* -------------------------------------------------------------------------- */
  const [wilayaOpen, setWilayaOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);

  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([12, 32]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="d text-darkblue-950">
      {/* field */}
      <div className="field mb-4">
        <Label className="text-lg text-darkblue-500">{"الولاية"}</Label>
        <Popover open={wilayaOpen} onOpenChange={setWilayaOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={wilayaOpen}
              className="w-full justify-between rounded-md border-2"
            >
              <div className="value text-xl">
                {!state ? (
                  <span className="text-darkblue-500">{"اختر ولاية..."}</span>
                ) : (
                  <span>{states.find(i => i.code === state)?.name || ""}</span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[436px] p-0 font-hammah text-2xl"
            align="start"
          >
            <Command>
              <CommandInput className="text-xl" placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                  لا توجد خيارات.
                </CommandEmpty>
                <CommandGroup>
                  {states.map(item => (
                    <CommandItem
                      key={item.code}
                      value={item.code}
                      onSelect={value => {
                        setState(value);
                        setWilayaOpen(false);
                      }}
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
      </div>
      {/* field */}
      <div className="field mb-4">
        <Label className="text-lg text-darkblue-500">{"البلدية"}</Label>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              className="w-full justify-between rounded-md border-2"
            >
              <div className="value text-xl">
                {!city ? (
                  <span className="text-darkblue-500">{"اختر بلدية..."}</span>
                ) : (
                  <span>{cities.find(i => i.code === city)?.name || ""}</span>
                )}
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[436px] p-0 font-hammah text-2xl"
            align="start"
          >
            <Command>
              <CommandInput className="text-xl" placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                  لا توجد خيارات.
                </CommandEmpty>
                <CommandGroup>
                  {cities
                    .filter(i => i.state_code === state)
                    .map(item => (
                      <CommandItem
                        key={item.code}
                        value={item.code}
                        onSelect={value => {
                          setState(value);
                          setWilayaOpen(false);
                        }}
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
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* field */}
        <div className="field mb-4">
          <Label className="text-lg text-darkblue-500">{"شهر الانطلاق"}</Label>
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={monthOpen}
                className="w-full justify-between rounded-md border-2"
              >
                <div className="value text-xl">
                  {!month ? (
                    <span className="text-darkblue-500">{"اختر..."}</span>
                  ) : (
                    <span>
                      {months.find(i => i.value === month)?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-hammah text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {months.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={value => {
                          setMonth(value);
                          setMonthOpen(false);
                        }}
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === month ? "opacity-100" : "opacity-0",
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
          <Label className="text-lg text-darkblue-500">
            {"عدد أيام الرحلة"}
          </Label>
          <Popover open={durationOpen} onOpenChange={setDurationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={durationOpen}
                className="w-full justify-between rounded-md border-2"
              >
                <div className="value text-xl">
                  {!duration ? (
                    <span className="text-darkblue-500">{"اختر مدة..."}</span>
                  ) : (
                    <span>
                      {durations.find(i => i.value === duration)?.label || ""}
                    </span>
                  )}
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[210px] p-0 font-hammah text-2xl"
              align="start"
            >
              <Command>
                <CommandInput className="text-xl" placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                    لا توجد خيارات.
                  </CommandEmpty>
                  <CommandGroup>
                    {durations.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={value => {
                          setDuration(value);
                          setDurationOpen(false);
                        }}
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
      </div>
      <div className="field mb-4">
        <p className="d flex items-center gap-3 text-text-500">
          <LuHelpCircle className="h-4 w-4" />
          <span className="dd">ماذا تفضل أن يكون متوفرا في العرض؟</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
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
                />
              </FormControl>
              <span className="text-xl">{item.label}</span>
            </FormLabel>
          ))}
        </div>
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
            max={50}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
          ></Slider>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button className="flex items-center gap-4 rounded-lg bg-red2-800 px-4 py-3 text-2xl text-white transition-all duration-200 hocus:bg-red2-950 hocus:shadow-md hocus:shadow-beige-500">
          <LuSearch className="h-6 w-6" />
          <span className="block px-2">العثور على عروض عمرة</span>
        </button>
      </div>
    </div>
  );
};

export type HomepageSearchFormProps = JouryCMS.Theme.ComponentProps & {};

const HomepageSearchForm: React.FC<HomepageSearchFormProps> = ({}) => {
  return (
    <div className="jcms-hero-section min-h-[600px] w-[500px] rounded-4xl bg-beige-50 shadow-lg shadow-darkblue-900/10 transition-all">
      <Tabs defaultValue="omrah" className="w-full">
        <TabsList className="h-auto w-full items-center justify-around bg-transparent">
          <TabsTrigger
            className="group relative bg-transparent px-4 py-4 text-3xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:text-3xl data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent"
            value="bids"
          >
            <span>مناقصات</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
          <TabsTrigger
            className="group relative bg-transparent px-4 py-4 text-3xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:text-3xl data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent"
            value="tombolas"
          >
            <span>طنبولات</span>
            <Image
              src="/assets/miqat/svg/search-tab-anchor.svg"
              className="absolute -bottom-4 h-auto w-8 opacity-0 group-data-[state=active]:opacity-100"
              width={20}
              height={32}
              alt=""
            />
          </TabsTrigger>
          <TabsTrigger
            className="group relative bg-transparent px-4 py-4 text-3xl text-beige-950 transition-all data-[state=active]:bg-transparent data-[state=active]:text-3xl data-[state=active]:font-medium data-[state=active]:text-red-600 data-[state=active]:shadow-none hover:text-red-600 active:bg-transparent"
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
          <div className="min-h-[560px] rounded-4xl bg-white p-4 px-8">
            <OmrahSearchForm />
          </div>
        </TabsContent>
        <TabsContent value="tombolas">
          <div className="min-h-[560px] rounded-4xl bg-white p-4 px-8">
            Change your password here.
          </div>
        </TabsContent>
        <TabsContent value="bids">
          <div className="min-h-[560px] rounded-4xl bg-white p-4 px-8">
            Change your password here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomepageSearchForm;
