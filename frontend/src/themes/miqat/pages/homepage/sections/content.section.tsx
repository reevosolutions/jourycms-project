"use client";
import Image from "next/image";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HomepageContentBidsSection from "./content.bids.section";
import HomepageContentOmrahSection from "./content.omrah.section";
import HomepageContentTombolasSection from "./content.tombolas.section";

export type HomepageContentSectionProps = JouryCMS.Theme.ComponentProps & {};

const HomepageContentSection: React.FC<HomepageContentSectionProps> = ({}) => {
  return (
    <section className="bg-gray-50/50">
      <div className="container mx-auto py-10">
        <Tabs defaultValue="omrah" className="w-full" dir="rtl">
          <TabsList className="h-auto w-full items-center justify-start rounded-none border-b border-darkblue-100 bg-transparent py-0">
            <TabsTrigger
              className="group flex items-center gap-4 rounded-none border-b-2 border-b-transparent bg-transparent px-8 py-4 text-4xl text-darkblue-400 transition-all data-[state=active]:border-b-darkblue-900 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-darkblue-950 data-[state=active]:shadow-none hover:text-darkblue-900 active:bg-transparent"
              value="omrah"
            >
              <Image
                src="/assets/miqat/icons/discount-svgrepo-com.svg"
                width={32}
                height={32}
                alt=""
                className="opacity-40 group-data-[state=active]:opacity-100"
              />
              <span className="d">عروض العمرة</span>
            </TabsTrigger>
            <TabsTrigger
              className="group flex items-center gap-4 rounded-none border-b-2 border-b-transparent bg-transparent px-8 py-4 text-4xl text-darkblue-400 transition-all data-[state=active]:border-b-darkblue-900 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-darkblue-950 data-[state=active]:shadow-none hover:text-darkblue-900 active:bg-transparent"
              value="tombolas"
            >
              <Image
                src="/assets/miqat/icons/tickets-ticket-svgrepo-com.svg"
                width={32}
                height={32}
                alt=""
                className="opacity-40 group-data-[state=active]:opacity-100"
              />
              <span className="d">طنبولات</span>
            </TabsTrigger>
            <TabsTrigger
              className="group flex items-center gap-4 rounded-none border-b-2 border-b-transparent bg-transparent px-8 py-4 text-4xl text-darkblue-400 transition-all data-[state=active]:border-b-darkblue-900 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-darkblue-950 data-[state=active]:shadow-none hover:text-darkblue-900 active:bg-transparent"
              value="bids"
            >
              <Image
                src="/assets/miqat/icons/champion-winner-award-svgrepo-com.svg"
                width={32}
                height={32}
                alt=""
                className="opacity-40 group-data-[state=active]:opacity-100"
              />
              <span className="d">مناقصات</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="omrah">
            <HomepageContentOmrahSection />
          </TabsContent>
          <TabsContent value="tombolas">
            <HomepageContentTombolasSection />
          </TabsContent>
          <TabsContent value="bids">
            <HomepageContentBidsSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HomepageContentSection;
