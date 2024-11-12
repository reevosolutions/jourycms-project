"use client";
import useCMSContent from "@/hooks/use-cms-content";
import Pattern from "@/themes/miqat/components/pattern";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type HomepageCallToActionSectionProps =
  JouryCMS.Theme.ComponentProps & {};

const HomepageCallToActionSection: React.FC<
  HomepageCallToActionSectionProps
> = ({ children }) => {
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
    <section className="bg-gray-50/50">
      <div className="text-center relative">

        <div className="bg-beige-50 py-16 pb-4 relative">
          <div className="absolute z-0 left-1/2 -translate-x-1/2 top-16 opacity-15">
            <Pattern width={700} color="#c6a789" />
          </div>
          <div className="absolute z-0 left-0 top-1/2 -translate-y-1/2 opacity-100 overflow-hidden h-[500px] w-[250px]">
            <Pattern width={500} color="#d5bd97" />
          </div>
          <div className="absolute z-0 right-0 top-1/2 translate-y-0 opacity-30 overflow-hidden h-[1000px] w-[500px]">
            <div className="absolute z-0 left-0 top-0">
            <Pattern width={1000} color="#c6a789" />
            </div>
          </div>
          <div className=" relative z-10">
            <h2 className="mt-0 pb-16 text-center text-8xl font-bold text-red2-800">
              {getWebsiteConfigValue("name")}
            </h2>

            <p className="mb-6 text-5xl font-bold text-beige-700">
              أنشئ حسابا الآن و تمتع بأرقى الخدمات
            </p>
            <p className="mx-auto px-4 text-3xl text-beige-700 lg:w-1/2">
              سجل نفسك بخطوات بسيطة ليملك كل جديد حول رحلات العمرة في الجزائر،
              ستجد آلاف العروض و المفاجآت السارة ، خدمات سوف تجعل من خدماتك أكثر
              احترافية و تميز سجل اليوم و كن شريكا استراتيجيا.
            </p>
            <div className="flex justify-center py-16 pb-12">
              <Link
                href="/register"
                className="rounded-lg bg-red2-800 px-16 py-6 text-6xl font-bold text-white transition-all duration-200 hocus:bg-red2-900"
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
