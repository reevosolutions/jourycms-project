"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    tooltip: (value: number) => React.ReactNode;
  }
>(({ className, tooltip, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-darkblue-500/20">
      <SliderPrimitive.Range className="absolute h-full bg-orange-300/40" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative block h-5 w-5 cursor-col-resize rounded-full border border-orange-300 bg-orange-300 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-300 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute left-1/2 top-full flex w-20 -translate-x-1/2 items-center justify-center pt-2">
        <span className="h-7 rounded-sm border border-orange-300 px-2 pt-0 bg-white text-lg font-bold text-orange-300">
          {tooltip && tooltip(props.value?.[0] as number)}
        </span>
      </div>
    </SliderPrimitive.Thumb>
    <SliderPrimitive.Thumb className="relative block h-5 w-5 cursor-col-resize rounded-full border border-orange-300 bg-orange-300 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-300 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute left-1/2 top-full flex w-20 -translate-x-1/2 items-center justify-center pt-2">
        <span className="h-7 rounded-sm border border-orange-300 px-2 pt-0 bg-white text-lg font-bold text-orange-300">
          {tooltip && tooltip(props.value?.[1] as number)}
        </span>
      </div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
