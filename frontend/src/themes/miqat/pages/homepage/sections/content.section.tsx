"use client";
import Image from "next/image";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ContentSection from "@/themes/miqat/components/content.section.client";
import {ArticleTypeSlug} from "@/themes/miqat/config";

export type HomepageContentSectionProps = JouryCMS.Theme.ComponentProps & {};

const CustomTabTrigger: React.FC<{
  label: string;
  image: string;
  tab: string;
}> = ({label, image, tab}) => (
  <TabsTrigger
    className="group flex flex-col items-center justify-center gap-2 rounded-none border-b-2 border-b-transparent bg-transparent sm:px-8 px-4 py-4 text-4xl text-darkblue-400 transition-all data-[state=active]:border-b-darkblue-900 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-darkblue-950 data-[state=active]:shadow-none hover:text-darkblue-900 active:bg-transparent md:flex-row lg:gap-4"
    value={tab}
  >
    <Image
      src={image}
      width={32}
      height={32}
      alt=""
      className="opacity-40 group-data-[state=active]:opacity-100"
    />
    <span className="text-xl sm:text-3xl md:text-4xl">{label}</span>
  </TabsTrigger>
);

const HomepageContentSection: React.FC<HomepageContentSectionProps> = ({}) => {
  return (
    <section className="bg-gray-50/50">
      <div className="container mx-auto px-4 py-10 sm:px-8">
        <Tabs defaultValue="omrah" className="w-full" dir="rtl">
          <TabsList className="h-auto w-full items-center justify-between rounded-none border-b border-darkblue-100 bg-transparent py-0 lg:justify-start">
            <CustomTabTrigger
              tab="omrah"
              image="/assets/miqat/icons/discount-svgrepo-com.svg"
              label="عروض العمرة"
            />
            <CustomTabTrigger
              tab="tombolas"
              image="/assets/miqat/icons/tickets-ticket-svgrepo-com.svg"
              label="طمبولات"
            />
            <CustomTabTrigger
              tab="bids"
              image="/assets/miqat/icons/champion-winner-award-svgrepo-com.svg"
              label="مناقصات"
            />
          </TabsList>
          <TabsContent value="omrah">
            <div className="relative min-h-screen-60">
              <ContentSection
                articleTypeSlug={ArticleTypeSlug.OMRAH}
                count={12}
                showPagination={false}
              />
            </div>
          </TabsContent>
          <TabsContent value="tombolas">
            <div className="relative min-h-screen-60">
              <ContentSection
                articleTypeSlug={ArticleTypeSlug.TOMBOLA}
                count={12}
                showPagination={false}
              />
            </div>
          </TabsContent>
          <TabsContent value="bids">
            <div className="relative min-h-screen-60">
              <ContentSection
                articleTypeSlug={ArticleTypeSlug.BID}
                count={12}
                showPagination={false}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HomepageContentSection;
