"use client";
import {ParallaxBanner, ParallaxProvider} from "react-scroll-parallax";
import Icons from "@/features/admin/ui/icons";
import HomepageSearchForm from "@/themes/miqat/components/homepage-search-form";
import Link from "next/link";
import React from "react";
import useCMSContent from "@/hooks/use-cms-content";

export type HomepageHeroSection_3Props = JouryCMS.Theme.ComponentProps & {};

const headlines = [
  "نحن أول منصة جزائرية",
  "تجمع كل عروض العمرة ",
  "ابحث... اختر... اعتمر",
];

const HomepageHeroSection_3: React.FC<HomepageHeroSection_3Props> = ({
  children,
}) => {
  const {getWebsiteConfig, getWebsiteConfigValue} = useCMSContent();

  return (
    <ParallaxProvider>
      <div className="jcms-hero-section relative">
        <div className="d"></div>

        <ParallaxBanner
          className="aspect-[3/1] min-h-[600px] lg:min-h-[700px]"
          layers={[
            {image: "/assets/miqat/images/praying_man.webp", speed: -40},
            {
              speed: -10,
              children: (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto mt-20 hidden lg:block"></div>
                </div>
              ),
            },
          ]}
          style={{
            backgroundImage:
              "url(data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAADQBACdASoUAAsAPm0skUWkIqGYBABABsSgCdMoR4HhJ/09WByq2W2RCveyjqwAAAD+/TP4+UP/9qT9/Hp/rfi//IHM31eYEcsIXlq/xIKzuIai+OZ8HEt3178oPnFFiA/xhhk+dUwvmaCvPQmqRP51FnEcfJKb6A9bmM6OUXC0hOEY1S4EYIeolA6ucbG9nZlJQRncnCHloMHbZ/piPja//CY3coRYVfYyCuj5dn7V/m838rkEQAtPciL8ki8A6F+0sAAA)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </ParallaxBanner>

        <div className="bg-beige-50 py-12 pb-16 text-beige-900">
          <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 px-4 pt-4 md:px-8 lg:flex-row lg:pt-0">
            <div className="text-center lg:text-start">
              <h2 className="mb-2 text-5xl font-bold text-beige-800">
                عن {getWebsiteConfig().name}
              </h2>
              <h2
                className="inline-flex flex-col gap-1 py-2 text-2xl font-normal leading-tight lg:text-3xl"
                dangerouslySetInnerHTML={{
                  __html: headlines.map(s => `<span>${s}</span>`).join(""),
                }}
              />
              <div className="flex flex-col items-center gap-4 pt-6 text-darkblue-950 md:flex-row md:gap-10">
                <b className="text-3xl">تجدنا على</b>
                <div className="flex items-center gap-4">
                  {getWebsiteConfig()?.social_links?.map(network =>
                    network.url ? (
                      <a
                        target="_blank"
                        aria-label={network.network}
                        key={network.network}
                        href={network.url}
                        className="rounded-full bg-darkblue-900 p-2 text-beige-50 transition-all duration-200 hocus:bg-red2-700"
                      >
                        {network.network === "facebook" ? (
                          <Icons.Social.Facebook className="h-6 w-6" />
                        ) : network.network === "instagram" ? (
                          <Icons.Social.Instagram className="h-6 w-6" />
                        ) : network.network === "twitter" ? (
                          <Icons.Social.Twitter className="h-6 w-6" />
                        ) : network.network === "youtube" ? (
                          <Icons.Social.Youtube className="h-6 w-6" />
                        ) : network.network === "pinterest" ? (
                          <Icons.Social.Pinterest className="h-6 w-6" />
                        ) : network.network === "tiktok" ? (
                          <Icons.Social.Tiktok className="h-6 w-6" />
                        ) : network.network === "linkedin" ? (
                          <Icons.Social.LinkedIn className="h-6 w-6" />
                        ) : null}
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
            <div className="relative w-full sm:w-auto">
              <div className="end-1/2 -mt-[560px] lg:absolute lg:bottom-full lg:end-0 lg:-mt-0">
                <HomepageSearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default HomepageHeroSection_3;
