"use client";
import Icons from "@/features/admin/ui/icons";
import useCMSContent from "@/hooks/use-cms-content";
import HomepageEscortsSearchForm from "@/themes/miqat/components/homepage-escorts-search-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type HomepageEscortsSectionProps = JouryCMS.Theme.ComponentProps & {};

const HomepageEscortsSection: React.FC<HomepageEscortsSectionProps> = ({
  children,
}) => {
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
      <aside className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="pt-16">
          <h2 className="mt-0 pb-6 text-7xl font-bold text-darkblue-800">
            تحتاج إلى مساعدين أكفاء؟
          </h2>
          <p className="mt-0 pb-8 text-4xl text-darkblue-600">
            اعثر على مرافقين و أطباء محترفين و متخصصين يرافقون زبائنك و يوفرون
            عليهم الكثير من الوقت والجهد.
          </p>

          <aside className="h-80"></aside>
        </div>
        <div className="flex justify-center gap-8">
          <Image
            src="/assets/miqat/svg/doctor.svg"
            width={600}
            height={600}
            alt=""
            className="h-auto w-full"
          />
        </div>
      </aside>
      <div className="relative bg-turqoi-50">
        <Image
          className="absolute left-0 top-0 w-60"
          src="/assets/miqat/svg/cloud-top.svg"
          width={600}
          height={600}
          alt=""
        />
        <Image
          className="absolute bottom-0 right-0 w-96"
          src="/assets/miqat/svg/cloud-bottom.svg"
          width={600}
          height={600}
          alt=""
        />
        <div className="container relative z-10 mx-auto py-28 pb-36">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="d">
              <aside className="relative mb-8 h-40">
                <div className="absolute bottom-0 left-0 right-0">
                  <HomepageEscortsSearchForm />
                </div>
              </aside>
              <div className="flex items-center gap-10">
                <span className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white shadow-lg shadow-darkblue-100">
                  <Icons.Social.Youtube className="h-16 w-16 text-red-500" />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="text-4xl font-bold text-slate-600">
                    شاهد الفيديو
                  </span>
                  <span className="text-2xl text-slate-600">
                    يشرح العملية بشكل دقيق كما يوضح كيفية تقديم الطلب
                  </span>
                </div>
              </div>
            </div>
            <div className="d">
              <h2 className="mt-0 pb-6 text-7xl font-bold text-darkblue-800">
                خدمات طبية متميزة
              </h2>
              <p className="mt-0 pb-8 text-4xl text-darkblue-600">
                توفر طواقم طبية متكاملة لمرافقتكم طول الوقت، أدوات طبية حديثة،
                تدريب واسع في التعامل مع كبار السن.
              </p>
              <Link
                href="/escorts"
                className="inline-flex items-center justify-center gap-6 rounded-lg bg-red2-800 px-8 py-3 text-center text-2xl font-bold text-white transition-all hocus:bg-red2-950"
              >
                <span className="d">معرفة المزيد</span>
                <Icons.Chevron.Left className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageEscortsSection;