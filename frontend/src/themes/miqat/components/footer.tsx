'use client';
import Icons from '@/features/admin/ui/icons';
import useCMSContent from '@/hooks/use-cms-content';
import { multiLinesToHTML } from '@/lib/utilities/strings/html.utilities';
import Link from 'next/link';
import * as React from 'react';
import { useState, useEffect } from 'react';

const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  // youtube: "#",
  // pinterest: "#",
  tiktok: "#",
  linkedIn: "#",
} as const;


export type LayoutProps = JouryCMS.Theme.ComponentProps & {

}

const Footer: React.FC<LayoutProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { getWebsiteConfig, getWebsiteConfigValue } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="jcms-footer bg-darkblue-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* about */}
        <div className="py-6 lg:py-16 px-6 flex items-center justify-center bg-darkblue-900">
          <div className="d">
            <h2 className="text-8xl text-center  font-bold">{getWebsiteConfig()?.name}</h2>

            <div className="text-white text-lg mt-4 w-80" dangerouslySetInnerHTML={{ __html: multiLinesToHTML(getWebsiteConfig()?.description || '') }} />

            <div className="flex items-center gap-8 text-white mt-16">
              <b className="text-2xl">تجدنا على</b>
              <div className="flex items-center gap-4">
                {getWebsiteConfig()?.social_links?.map((network) => (
                  network.url ? <a target='_blank' key={network.network} href={network.url} className=" text-darkblue-900 bg-white p-2 hocus:bg-red2-700 duration-200 transition-all rounded-full">
                    {
                      network.network === 'facebook' ? <Icons.Social.Facebook className="w-4 h-4 " />
                        : network.network === 'instagram' ? <Icons.Social.Instagram className="w-4 h-4 " />
                          : network.network === 'twitter' ? <Icons.Social.Twitter className="w-4 h-4 " />
                            : network.network === 'youtube' ? <Icons.Social.Youtube className="w-4 h-4 " />
                              : network.network === 'pinterest' ? <Icons.Social.Pinterest className="w-4 h-4 " />
                                : network.network === 'tiktok' ? <Icons.Social.Tiktok className="w-4 h-4 " />
                                  : network.network === 'linkedin' ? <Icons.Social.LinkedIn className="w-4 h-4 " />
                                    : null
                    }

                  </a> : null
                ))}

              </div>
            </div>
          </div>
        </div>
        {/* links */}
        <div className="py-6 lg:py-24 px-6 flex items-top justify-center bg-darkblue-900">
          <div className="d">
            <h2 className="text-3xl  font-bold">روابط</h2>

            <div className="flex text-2xl items-center gap-8 mt-16">
              <ul>
                <li className="">
                  <Link href="/" className="text-white transition-all duration-200 hocus:text-beige-50">
                    الرئيسية
                  </Link>
                </li>
                <li className="">
                  <Link href="/" className="text-white transition-all duration-200 hocus:text-beige-50">
                    العروض
                  </Link>
                </li>
                <li className="">
                  <Link href="/" className="text-white transition-all duration-200 hocus:text-beige-50">
                    المقالات
                  </Link>
                </li>
                <li className="">
                  <Link href="/" className="text-white transition-all duration-200 hocus:text-beige-50">
                    المنتجات
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* contact */}
        <div className="py-6 lg:py-24 px-6 flex items-top justify-center bg-darkblue-950 text-darkblue-50">
          <div className="d">
            <h2 className="text-3xl  font-bold">الاتصال بنا</h2>

            <div className="flex text-2xl flex-col  gap-4 mt-16">
              <div className="flex gap-3">
                <Icons.Marker className="w-6 h-6 text-darkblue-500 mt-1" />
                <div className="" dangerouslySetInnerHTML={{ __html: multiLinesToHTML(getWebsiteConfig()?.address || '') }} />

              </div>
              <div className="flex gap-3">
                <Icons.Envelope className="w-6 h-6 text-darkblue-500 mt-1" />
                <div className="">
                  <a href={`mailto:${getWebsiteConfig()?.contact_email}`} className="t">{getWebsiteConfig()?.contact_email}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Icons.Phone className="w-6 h-6 text-darkblue-500 mt-1" />
                <div className="">
                  <a href={`tel:${getWebsiteConfig()?.contact_phones?.[0]}`} className="t">{getWebsiteConfig()?.contact_phones?.[0]}</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Footer;