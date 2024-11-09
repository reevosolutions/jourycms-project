import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label';
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
import { LuCheck, LuChevronsUpDown, LuHelpCircle, LuSearch, LuX } from "react-icons/lu";
import { cn } from '@/lib/utils';
import { FormControl, FormLabel } from '@/components/ui/customized.form';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from "@/components/ui/customized.slider"

type State = {
  code: string;
  name: string;
}
type City = {
  state_code: string;
  code: string;
  name: string;
}


const states: State[] = [];
const cities: City[] = [];
const months: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [];
const durations: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [];
const services: Levelup.CMS.V1.Utils.Common.TLabelValue[] = [
  {
    value: "transportation",
    label: "خدمة النقل"
  }, {
    value: "with_kids",
    label: "تنوي السفر برفقة الأطفال"
  },
  {
    value: "shrines",
    label: "خدمة الزيارات"
  },
  {
    value: "proximity_to_the_holy_mosque",
    label: "القرب من الحرم المكي"
  }
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
    <div className="d  text-darkblue-950">
      {/* field */}
      <div className="field mb-4">
        <Label className=' text-darkblue-500 text-lg'>{"الولاية"}</Label>
        <Popover open={wilayaOpen} onOpenChange={setWilayaOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={wilayaOpen}
              className="w-full justify-between rounded-md border-2"
            >
              <div className="value text-xl">
                {!state
                  ? <span className=' text-darkblue-500'>{"اختر ولاية..."}</span>
                  : <span>{states.find(i => i.code === state)?.name || ''}</span>
                }
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[436px] p-0  font-hammah text-2xl" align="start">
            <Command>
              <CommandInput className='text-xl' placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className='text-xl text-darkblue-500 text-center py-6'>لا توجد خيارات.</CommandEmpty>
                <CommandGroup>

                  {states.map((item) => (
                    <CommandItem
                      key={item.code}
                      value={item.code}
                      onSelect={(value) => {
                        setState(value);
                        setWilayaOpen(false)
                      }}
                    >
                      {item.name}
                      <LuCheck
                        className={cn(
                          "ms-auto",
                          item.code === state ? "opacity-100" : "opacity-0"
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
        <Label className=' text-darkblue-500 text-lg'>{"البلدية"}</Label>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              className="w-full justify-between rounded-md border-2"
            >
              <div className="value text-xl">
                {!city
                  ? <span className=' text-darkblue-500'>{"اختر بلدية..."}</span>
                  : <span>{cities.find(i => i.code === city)?.name || ''}</span>
                }
              </div>
              <LuChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[436px] p-0 font-hammah text-2xl" align="start">
            <Command>
              <CommandInput className='text-xl' placeholder="ابحث هنا..." />
              <CommandList>
                <CommandEmpty className='text-xl text-darkblue-500 text-center py-6'>لا توجد خيارات.</CommandEmpty>
                <CommandGroup>

                  {cities.filter(i => i.state_code === state).map((item) => (
                    <CommandItem
                      key={item.code}
                      value={item.code}
                      onSelect={(value) => {
                        setState(value);
                        setWilayaOpen(false)
                      }}
                    >
                      {item.name}
                      <LuCheck
                        className={cn(
                          "ms-auto",
                          item.code === state ? "opacity-100" : "opacity-0"
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
          <Label className=' text-darkblue-500 text-lg'>{"الولاية"}</Label>
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={monthOpen}
                className="w-full justify-between rounded-md border-2"
              >
                <div className="value text-xl">
                  {!month
                    ? <span className=' text-darkblue-500'>{"اختر ولاية..."}</span>
                    : <span>{months.find(i => i.value === month)?.label || ''}</span>
                  }
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[210px] p-0  font-hammah text-2xl" align="start">
              <Command>
                <CommandInput className='text-xl' placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className='text-xl text-darkblue-500 text-center py-6'>لا توجد خيارات.</CommandEmpty>
                  <CommandGroup>

                    {months.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(value) => {
                          setMonth(value);
                          setMonthOpen(false)
                        }}
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === month ? "opacity-100" : "opacity-0"
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
          <Label className=' text-darkblue-500 text-lg'>{"عدد أيام الرحلة"}</Label>
          <Popover open={durationOpen} onOpenChange={setDurationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={durationOpen}
                className="w-full justify-between rounded-md border-2"
              >
                <div className="value text-xl">
                  {!duration
                    ? <span className=' text-darkblue-500'>{"اختر مدة..."}</span>
                    : <span>{durations.find(i => i.value === duration)?.label || ''}</span>
                  }
                </div>
                <LuChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[210px] p-0  font-hammah text-2xl" align="start">
              <Command>
                <CommandInput className='text-xl' placeholder="ابحث هنا..." />
                <CommandList>
                  <CommandEmpty className='text-xl text-darkblue-500 text-center py-6'>لا توجد خيارات.</CommandEmpty>
                  <CommandGroup>

                    {durations.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(value) => {
                          setDuration(value);
                          setDurationOpen(false)
                        }}
                      >
                        {item.label}
                        <LuCheck
                          className={cn(
                            "ms-auto",
                            item.value === duration ? "opacity-100" : "opacity-0"
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
        <p className="d text-text-500 flex gap-3 items-center">
          <LuHelpCircle className='w-4 h-4' />
          <span className="dd">
            ماذا تفضل أن يكون متوفرا في العرض؟
          </span>
        </p>
        <div className="grid gap-2 grid-cols-2 ">
          {services.map((item) => (
            <FormLabel key={item.value} className="font-normal flex items-center gap-3 w-full cursor-pointer">
              <FormControl >
                <Checkbox
                  className="rounded-full data-[state=checked]:bg-orange-400 border-orange-400"
                  checked={selectedServices.includes(item.value)}
                  onCheckedChange={(checked) => {
                    const value = checked ? [...selectedServices, item.value] : selectedServices.filter((value) => value !== item.value);
                    setSelectedServices(value);
                  }}
                />
              </FormControl>
              <span className=' text-xl'>
                {item.label}
              </span>
            </FormLabel>
          ))}
        </div>
      </div>
      <div className="field mb-0">
        <p className="d text-text-500 flex gap-3 items-center mb-2">
          <LuHelpCircle className='w-4 h-4' />
          <span className="dd">
            حدد ميزانيتك          </span>
        </p>
        <div className=" mb-10">
          <Slider inverted minStepsBetweenThumbs={5} defaultValue={priceRange} min={10} max={50} step={1} value={priceRange} onValueChange={setPriceRange}>
          </Slider>
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button className=' py-3 px-4 flex items-center gap-4 text-white bg-red2-800 hocus:bg-red2-950 transition-all duration-200 rounded-lg text-2xl hocus:shadow-md hocus:shadow-beige-500 '>
          <LuSearch className='w-6 h-6' />
          <span className='block px-2'>
            العثور على عروض عمرة
          </span>
        </button>
      </div>
    </div>
  );
}

export type HomepageSearchFormProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageSearchForm: React.FC<HomepageSearchFormProps> = ({ }) => {
  return (
    <div className="jcms-hero-section rounded-4xl shadow-darkblue-900/10 shadow-lg bg-beige-50 min-h-[600px] w-[500px] transition-all" >
      <Tabs defaultValue="omrah" className="w-full">
        <TabsList className='w-full justify-around h-auto items-center bg-transparent'>
          <TabsTrigger className='bg-transparent px-4 py-4   active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-medium text-beige-950 data-[state=active]:text-red-600 data-[state=active]:text-3xl text-3xl hover:text-red-600 transition-all ' value="bids">مناقصات</TabsTrigger>
          <TabsTrigger className='bg-transparent px-4 py-4   active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-medium text-beige-950 data-[state=active]:text-red-600 data-[state=active]:text-3xl text-3xl hover:text-red-600 transition-all ' value="tombolas">طنبولات</TabsTrigger>
          <TabsTrigger className='bg-transparent px-4 py-4   active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-medium text-beige-950 data-[state=active]:text-red-600 data-[state=active]:text-3xl text-3xl hover:text-red-600 transition-all ' value="omrah">عروض العمرة</TabsTrigger>
        </TabsList>
        <TabsContent value="omrah" dir='rtl'>
          <div className="rounded-4xl bg-white p-4 px-8 min-h-[560px]">
            <OmrahSearchForm />
          </div>

        </TabsContent>
        <TabsContent value="tombolas">
          <div className="rounded-4xl bg-white p-4 px-8 min-h-[560px]">

            Change your password here.
          </div>
        </TabsContent>
        <TabsContent value="bids">
          <div className="rounded-4xl bg-white p-4 px-8 min-h-[560px]">

            Change your password here.
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default HomepageSearchForm;