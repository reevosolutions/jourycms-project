"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Icons from "@/features/admin/ui/icons";

// eslint-disable-next-line no-undef
export type HomepageSeatsSectionProps = JouryCMS.Theme.ComponentProps & {};

const HomepageSeatsSection: React.FC<HomepageSeatsSectionProps> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  // const { getWebsiteConfig, getWebsiteConfigValue } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="bg-gray-50/50">
      <div className="container mx-auto py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="pt-16">
            <h2 className="mt-0 pb-8 text-5xl font-bold text-darkblue-800 sm:text-6xl md:text-7xl">
              بيع أو شراء مقاعد في الطائرة
            </h2>
            <h3 className="mt-0 pb-8 text-4xl text-darkblue-800 sm:text-5xl">
              عندك مقاعد إضافية أو لديك نقص في الأماكن؟
            </h3>
            <p className="mt-0 pb-8 text-3xl text-darkblue-600 sm:text-4xl">
              نقدم لك خدمة فريدة لبيع أو استبدال أو حتى منح مقاعد الطائرة
              الفائضة لأشخاص آخرين هم في أشد الحاجة لها.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <Link
                href="/seat-requests/order"
                className="flex items-center justify-center gap-4 rounded-lg bg-red2-800 px-4 py-3 text-center text-xl sm:text-2xl font-bold text-white transition-all hocus:bg-red2-950 sm:py-4 md:text-3xl"
              >
                قدم طلبا الآن
              </Link>
              <Link
                href="/seat-requests"
                className="flex items-center justify-center gap-4 rounded-lg border-2 border-darkblue-500 px-4 py-3 text-center text-xl sm:text-2xl font-bold text-darkblue-800 transition-all hocus:bg-slate-50 sm:py-4 md:text-3xl"
              >
                معرفة المزيد
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8">
            <Image
              src="/assets/miqat/svg/fly.svg"
              width={600}
              height={600}
              alt=""
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-10 md:py-12 xl:py-0">
          <span className="box-shadow-lg flex h-24 w-24 flex-col items-center justify-center rounded-full shadow-slate-200">
            <Icons.Social.Youtube className="h-16 w-16 text-red-500" />
          </span>
          <div className="flex flex-col gap-0">
            <span className="text-3xl font-bold text-slate-500 md:text-5xl">
              شاهد الفيديو
            </span>
            <span className="text-2xl text-slate-500 md:text-4xl">
              يشرح العملية بشكل دقيق كما يوضح كيفية تقديم الطلب
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageSeatsSection;
