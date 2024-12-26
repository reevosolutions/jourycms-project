"use client";
import {ParallaxBanner, ParallaxProvider} from "react-scroll-parallax";
import Icons from "@/features/admin/ui/icons";
import HomepageSearchForm from "@/themes/miqat/components/homepage-search-form";
import Link from "next/link";
import React from "react";
import useCMSContent from "@/hooks/use-cms-content";

export type HomepageHeroSection_2Props = JouryCMS.Theme.ComponentProps & {};

const headlines = [
  "نحن أول منصة جزائرية",
  "تجمع كل عروض العمرة ",
  "ابحث... اختر... اعتمر",
];

const HomepageHeroSection_2: React.FC<HomepageHeroSection_2Props> = ({
  children,
}) => {
  const {getWebsiteConfig, getWebsiteConfigValue} = useCMSContent();

  return (
    <ParallaxProvider>
      <div className="jcms-hero-section relative">
        <div className="d"></div>

        <ParallaxBanner
          className="min-h-[1200px] sm:aspect-[3/1] sm:min-h-[900px]"
          layers={[
            {image: "/assets/miqat/images/praying_man.webp", speed: -40},
            {
              speed: 0,
              children: (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto mt-0 grid grid-cols-1 justify-center lg:grid-cols-2">
                    <div className="container mx-auto hidden flex-col justify-center px-0 lg:flex">
                      <h2
                        className="inline-flex flex-col gap-1 rounded-3xl px-8 py-2 text-5xl font-medium leading-tight text-white xl:text-6xl"
                        dangerouslySetInnerHTML={{
                          __html: headlines
                            .map(s => `<span>${s}</span>`)
                            .join(""),
                        }}
                      />
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <HomepageSearchForm />
                    </div>
                  </div>
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
      </div>
    </ParallaxProvider>
  );
};

export default HomepageHeroSection_2;
