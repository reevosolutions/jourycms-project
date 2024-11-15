"use client";
import { publicRoutes } from "@/config";
import Icons from "@/features/admin/ui/icons";
import useCMSContent from "@/hooks/use-cms-content";
import { multiLinesToHTML } from "@/lib/utilities/strings/html.utilities";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";

const socialLinks = {
  facebook: "#",
  instagram: "#",
  twitter: "#",
  // youtube: "#",
  // pinterest: "#",
  tiktok: "#",
  linkedIn: "#",
} as const;

export type FooterProps = JouryCMS.Theme.ComponentProps & {};

const Footer: React.FC<FooterProps> = ({ children }) => {
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
    <footer className="jcms-footer bg-darkblue-950 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* about */}
        <div className="flex items-center justify-center bg-darkblue-900 px-6 py-6 lg:py-16">
          <div className=" w-80 lg:w-auto max-w-full">
            <h2 className="text-center text-8xl font-bold">
              {getWebsiteConfig()?.name}
            </h2>

            <div
              className="mt-4 w-80 text-lg text-white"
              dangerouslySetInnerHTML={{
                __html: multiLinesToHTML(getWebsiteConfig()?.description || ""),
              }}
            />

            <div className="mt-16 flex-col lg:flex-row flex items-center gap-4 lg:gap-8 text-white">
              <b className="text-2xl">تجدنا على</b>
              <div className="flex items-center gap-4">
                {getWebsiteConfig()?.social_links?.map(network =>
                  network.url ? (
                    <a
                      aria-label={network.network}
                      target="_blank"
                      key={network.network}
                      href={network.url}
                      className="rounded-full bg-white p-2 text-darkblue-900 transition-all duration-200 hocus:bg-red2-700"
                    >
                      {network.network === "facebook" ? (
                        <Icons.Social.Facebook className="h-4 w-4" />
                      ) : network.network === "instagram" ? (
                        <Icons.Social.Instagram className="h-4 w-4" />
                      ) : network.network === "twitter" ? (
                        <Icons.Social.Twitter className="h-4 w-4" />
                      ) : network.network === "youtube" ? (
                        <Icons.Social.Youtube className="h-4 w-4" />
                      ) : network.network === "pinterest" ? (
                        <Icons.Social.Pinterest className="h-4 w-4" />
                      ) : network.network === "tiktok" ? (
                        <Icons.Social.Tiktok className="h-4 w-4" />
                      ) : network.network === "linkedin" ? (
                        <Icons.Social.LinkedIn className="h-4 w-4" />
                      ) : null}
                    </a>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>
        {/* links */}
        <div className="items-top flex justify-center bg-darkblue-900 px-6 py-6 lg:py-24">
          <div className="w-80 max-w-full">
            <h2 className="text-3xl font-bold">روابط</h2>

            <div className="mt-16 flex items-center gap-8 text-2xl">
              <ul>
                <li className="">
                  <Link
                    href="/"
                    className="text-white transition-all duration-200 hocus:text-beige-50"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li className="">
                  <Link
                    href={publicRoutes.homepage._.omrah.path}
                    className="text-white transition-all duration-200 hocus:text-beige-50"
                  >
                    {publicRoutes.homepage._.omrah.title}
                  </Link>
                </li>
                <li className="">
                  <Link
                    href="/"
                    className="text-white transition-all duration-200 hocus:text-beige-50"
                  >
                    المقالات
                  </Link>
                </li>
                <li className="">
                  <Link
                    href="/"
                    className="text-white transition-all duration-200 hocus:text-beige-50"
                  >
                    المنتجات
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* contact */}
        <div className="items-top flex justify-center bg-darkblue-950 px-6 py-6 text-darkblue-50 lg:py-24">
          <div className="w-80 max-w-full">
            <h2 className="text-3xl font-bold">الاتصال بنا</h2>

            <div className="mt-16 flex flex-col gap-4 text-2xl">
              <div className="flex gap-3">
                <Icons.Marker className="mt-1 h-6 w-6 text-darkblue-500" />
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: multiLinesToHTML(getWebsiteConfig()?.address || ""),
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Icons.Envelope className="mt-1 h-6 w-6 text-darkblue-500" />
                <div className="">
                  <a
                    href={`mailto:${getWebsiteConfig()?.contact_email}`}
                    className="t"
                  >
                    {getWebsiteConfig()?.contact_email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Icons.Phone className="mt-1 h-6 w-6 text-darkblue-500" />
                <div className="">
                  <a
                    href={`tel:${getWebsiteConfig()?.contact_phones?.[0]}`}
                    className="t"
                  >
                    {getWebsiteConfig()?.contact_phones?.[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
