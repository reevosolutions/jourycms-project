"use client";
import Image from "next/image";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ContentSection from "@/themes/miqat/components/content.section.client";
import {ArticleTypeSlug} from "@/themes/miqat/config";
import Link from "next/link";
import AgencyOnlyView from "@/guards/agency-only.view";
import { cn } from "@/lib/utils";

export type HomepageContentSectionProps = JouryCMS.Theme.ComponentProps & {};

const CustomTabTrigger: React.FC<{
  label: string;
  image: string;
  tab: string;
  className?: string;
}> = ({label, image, tab, className}) => (
  <TabsTrigger
    className={cn("group flex flex-col items-center justify-center gap-2 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-4 text-xl text-darkblue-400 transition-all data-[state=active]:border-b-darkblue-900 data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-darkblue-950 data-[state=active]:shadow-none hover:text-darkblue-900 active:bg-transparent sm:px-8 md:flex-row lg:gap-4", className)}
    value={tab}
  >
    <Image
      src={image}
      width={32}
      height={32}
      alt=""
      className="opacity-40 group-data-[state=active]:opacity-100"
    />
    <span className="text-xl sm:text-xl md:text-2xl">{label}</span>
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
              className="hidden sm:flex"
              tab="hajj"
              image="/assets/miqat/icons/discount-svgrepo-com.svg"
              label="عروض الحج"
            />
            <CustomTabTrigger
              tab="tombolas"
              image="/assets/miqat/icons/tickets-ticket-svgrepo-com.svg"
              label="طمبولات"
            />
            <AgencyOnlyView>
              <CustomTabTrigger
                tab="bids"
                image="/assets/miqat/icons/champion-winner-award-svgrepo-com.svg"
                label="مناقصات"
              />
            </AgencyOnlyView>
          </TabsList>
          <TabsContent value="omrah">
            <div className="relative min-h-screen-60">
              <ContentSection
                articleTypeSlug={ArticleTypeSlug.OMRAH}
                count={12}
                showPagination={false}
                isOffer
              />
              <div className="flex justify-center py-10">
                <Link
                  href={`/omrah/2`}
                  className="rounded-xl bg-darkblue-700 px-10 py-2 pb-3 pt-4 text-3xl font-bold text-white transition-all hocus:bg-darkblue-900"
                >
                  عرض المزيد
                </Link>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hajj">
            <div className="relative min-h-screen-60">
              <ContentSection
                articleTypeSlug={ArticleTypeSlug.HAJJ}
                count={12}
                showPagination={false}
                isOffer
              />
              <div className="flex justify-center py-10">
                <Link
                  href={`/hajj/2`}
                  className="rounded-xl bg-darkblue-700 px-10 py-2 pb-3 pt-4 text-3xl font-bold text-white transition-all hocus:bg-darkblue-900"
                >
                  عرض المزيد
                </Link>
              </div>
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
          <AgencyOnlyView>
            <TabsContent value="bids">
              <div className="relative min-h-screen-60">
                <ContentSection
                  articleTypeSlug={ArticleTypeSlug.BID}
                  count={12}
                  showPagination={false}
                />
              </div>
            </TabsContent>
          </AgencyOnlyView>
        </Tabs>
      </div>
    </section>
  );
};

export default HomepageContentSection;
