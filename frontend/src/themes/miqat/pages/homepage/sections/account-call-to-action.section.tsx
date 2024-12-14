"use client";
import useCMSContent from "@/hooks/use-cms-content";
import Pattern from "@/themes/miqat/components/pattern";
import {animated, useScroll} from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type HomepageCallToActionSectionProps =
  JouryCMS.Theme.ComponentProps & {};

const HomepageCallToActionSection: React.FC<
  HomepageCallToActionSectionProps
> = ({children}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {getWebsiteConfig, getWebsiteConfigValue} = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const containerRef = React.useRef<HTMLDivElement>(null!);

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  const {scrollYProgress} = useScroll();

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="bg-gray-50/50" ref={containerRef}>
      <div className="relative text-center">
        <div className="relative bg-beige-50 py-16 pb-4" >
          <div className="absolute left-1/2 top-16 z-0 -translate-x-1/2 opacity-15 w-[700px] h-[700px] max-w-full overflow-hidden ">
            <Pattern width={700} color="#c6a789" />
          </div>
          <div className="absolute left-0 top-1/2 z-0 hidden h-[500px] w-[250px] -translate-y-1/2 overflow-hidden opacity-100 lg:block">
            <animated.div
              className="h-[500px] w-[500px]"
              style={{
                rotate: scrollYProgress.to(value => `${value * 180}deg`),
              }}
            >
              <Pattern width={500} color="#d5bd97" />
            </animated.div>
          </div>
          <div className="absolute right-0 top-1/2 z-0 hidden h-[600px] w-[300px] translate-y-0 overflow-hidden opacity-30 lg:block lg:h-[1000px] lg:w-[500px]">
            <div className="absolute left-0 top-0 z-0">
              <animated.div
                className="h-[600px] w-[600px] lg:h-[1000px] lg:w-[1000px]"
                style={{
                  rotate: scrollYProgress.to(value => `${value * 60}deg`),
                }}
              >
                <Pattern width={1000} color="#c6a789" />
              </animated.div>
            </div>
          </div>
          <div className="container mx-auto relative z-10">
            <h2 className="mt-0 pb-8  md:pb-16 text-center text-6xl sm:text-6xl md:text-8xl font-bold text-red2-800">
              {getWebsiteConfigValue("name")}
            </h2>

            <p className="mb-6 text-4xl  md:text-5xl font-bold text-beige-700">
              أنشئ حسابا الآن و تمتع بأرقى الخدمات
            </p>
            <p className="mx-auto px-4 text-2xl md:text-3xl text-beige-700 lg:w-1/2">
              سجل نفسك بخطوات بسيطة ليملك كل جديد حول رحلات العمرة في الجزائر،
              ستجد آلاف العروض و المفاجآت السارة ، خدمات سوف تجعل من خدماتك أكثر
              احترافية و تميز سجل اليوم و كن شريكا استراتيجيا.
            </p>
            <div className="flex justify-center py-16 pb-12">
              <Link
                href="/register"
                className="rounded-lg bg-red2-800 px-16 py-6 text-3xl font-bold text-white transition-all duration-200 hocus:bg-red2-900 md:text-5xl lg:text-6xl"
              >
                نعم، سجلني الآن
              </Link>
            </div>
            <p className="mx-auto px-4 pb-6 text-3xl text-beige-700 lg:w-3/5">
              اتصل بنا للمزيد من المعلومات
            </p>

            <a
              href={`https://wa.me/${getWebsiteConfigValue("contact_whatsapp")}`}
              target="_blank"
              className="flex items-center justify-center gap-4 text-4xl font-bold text-beige-900 transition-all hocus:text-beige-700"
              dir="ltr"
            >
              <Image
                src="/assets/miqat/svg/whatsapp-symbol-logo-svgrepo-com.svg"
                width={36}
                height={36}
                alt=""
              />
              <span>{getWebsiteConfigValue("contact_whatsapp")}</span>
            </a>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 360">
          <path
            fill="#e5d3a5"
            fillOpacity="1"
            d="M0,360L1440,96L1440,0L0,0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HomepageCallToActionSection;
