'use client';
import { ParallaxBanner } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CiDiscount1 } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import Icons from '@/features/admin/ui/icons';
import HomepageSearchForm from '@/themes/miqat/components/homepage-search-form';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import HomepageContentBidsSection from './content.bids.section';
import HomepageContentOmrahSection from './content.omrah.section';
import HomepageContentTombolasSection from './content.tombolas.section';

export type HomepageContentSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageContentSection: React.FC<HomepageContentSectionProps> = ({ children }) => {
  return (
    <div className=" bg-gray-50/50">

      <div className="container mx-auto py-10">
        <Tabs defaultValue="omrah" className="w-full" dir='rtl'>
          <TabsList className='w-full justify-start h-auto items-center bg-transparent border-b border-darkblue-100 rounded-none py-0'>
            <TabsTrigger className='bg-transparent px-8 flex items-center gap-4 py-4 rounded-none border-b-transparent   active:bg-transparent data-[state=active]:bg-transparent group data-[state=active]:shadow-none  data-[state=active]:font-medium text-darkblue-400 data-[state=active]:border-b-darkblue-900 border-b-2 data-[state=active]:text-darkblue-950 text-4xl hover:text-darkblue-900 transition-all ' value="omrah">
              <Image src="/assets/miqat/icons/discount-svgrepo-com.svg" width={32} height={32} alt='' className=' opacity-40 group-data-[state=active]:opacity-100' />
              <span className="d">
                عروض العمرة
              </span>
            </TabsTrigger>
            <TabsTrigger className='bg-transparent px-8 flex items-center gap-4 py-4 rounded-none border-b-transparent   active:bg-transparent data-[state=active]:bg-transparent group data-[state=active]:shadow-none  data-[state=active]:font-medium text-darkblue-400 data-[state=active]:border-b-darkblue-900 border-b-2 data-[state=active]:text-darkblue-950 text-4xl hover:text-darkblue-900 transition-all ' value="tombolas">
              <Image src="/assets/miqat/icons/tickets-ticket-svgrepo-com.svg" width={32} height={32} alt='' className=' opacity-40 group-data-[state=active]:opacity-100' />
              <span className="d">
                طنبولات
              </span>
            </TabsTrigger>
            <TabsTrigger className='bg-transparent px-8 flex items-center gap-4 py-4 rounded-none border-b-transparent   active:bg-transparent data-[state=active]:bg-transparent group data-[state=active]:shadow-none  data-[state=active]:font-medium text-darkblue-400 data-[state=active]:border-b-darkblue-900 border-b-2 data-[state=active]:text-darkblue-950 text-4xl hover:text-darkblue-900 transition-all ' value="bids">
              <Image src="/assets/miqat/icons/champion-winner-award-svgrepo-com.svg" width={32} height={32} alt='' className=' opacity-40 group-data-[state=active]:opacity-100' />
              <span className="d">
                مناقصات
              </span>
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
    </div>
  );
}

export default HomepageContentSection; 