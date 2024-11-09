'use client';
import { ParallaxBanner } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import Icons from '@/features/admin/ui/icons';
import HomepageSearchForm from '@/themes/miqat/components/homepage-search-form';
import Link from 'next/link';
import React from 'react';

export type HomepageContentBidsSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageContentBidsSection: React.FC<HomepageContentBidsSectionProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
     bids
    </div>
  );
}

export default HomepageContentBidsSection; 