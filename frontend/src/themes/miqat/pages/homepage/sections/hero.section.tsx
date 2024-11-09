'use client';
import { ParallaxBanner } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';


import Icons from '@/features/admin/ui/icons';
import HomepageSearchForm from '@/themes/miqat/components/homepage-search-form';
import Link from 'next/link';
import React from 'react';
import useCMSContent from '@/hooks/use-cms-content';

export type HomepageHeroSectionProps = JouryCMS.Theme.ComponentProps & {
};

const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  // youtube: "#",
  // pinterest: "#",
  tiktok: "#",
  linkedIn: "#",
} as const;


const HomepageHeroSection: React.FC<HomepageHeroSectionProps> = ({ children }) => {

  const { getWebsiteConfig, getWebsiteConfigValue } = useCMSContent();

  return (
    <ParallaxProvider>
      <div className="jcms-hero-section relative ">

        <div className="d"></div>
        <ParallaxBanner
          layers={[
            { image: '/assets/miqat/images/mosque2.png', speed: -40 },
          ]}
          className="aspect-[3/1] min-h-[600px]"
        >
          <div className="absolute inset-0 flex items-center justify-center ">

          </div>

        </ParallaxBanner>
        <div className=" bg-beige-50 py-12 pb-16 text-beige-900">
          <div className="container flex items-center justify-between gap-12">
            <div className="d">

              <h2 className=' text-beige-800 mb-2 text-5xl font-bold'>عن {getWebsiteConfig().name}</h2>
              <p className=" text-2xl ">
                نحن أول منصة جزائرية، تجمع كل عروض العمرة
              </p>
              <div className="flex items-center gap-10 text-darkblue-950 pt-6">
                <b className="text-3xl">تجدنا على</b>
                <div className="flex items-center gap-4">
                  {getWebsiteConfig()?.social_links?.map((network) => (
                    network.url ? <a target='_blank' key={network.network} href={network.url} className=" text-beige-50 bg-darkblue-900 p-2 hocus:bg-red2-700 duration-200 transition-all rounded-full">
                      {
                        network.network === 'facebook' ? <Icons.Social.Facebook className="w-6 h-6 " />
                          : network.network === 'instagram' ? <Icons.Social.Instagram className="w-6 h-6 " />
                            : network.network === 'twitter' ? <Icons.Social.Twitter className="w-6 h-6 " />
                              : network.network === 'youtube' ? <Icons.Social.Youtube className="w-6 h-6 " />
                                : network.network === 'pinterest' ? <Icons.Social.Pinterest className="w-6 h-6 " />
                                  : network.network === 'tiktok' ? <Icons.Social.Tiktok className="w-6 h-6 " />
                                    : network.network === 'linkedin' ? <Icons.Social.LinkedIn className="w-6 h-6 " />
                                      : null
                      }

                    </a> : null
                  ))}

                </div>
              </div>
            </div>
            <div className=" relative">
              <div className="absolute end-0 bottom-0">

                <HomepageSearchForm />
              </div>
            </div>
          </div>
        </div>



      </div>
    </ParallaxProvider>
  );
}

export default HomepageHeroSection;