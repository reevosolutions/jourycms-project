

'use client';
import Icons from '@/features/admin/ui/icons';
import useCMSContent from '@/hooks/use-cms-content';
import HomepageEscortsSearchForm from '@/themes/miqat/components/homepage-escorts-search-form';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type HomepageEscortsSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageEscortsSection: React.FC<HomepageEscortsSectionProps> = ({ children }) => {
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
    <section className=" bg-gray-50/50">

      <aside className=" grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto ">
        <div className="pt-16">
          <h2 className="mt-0 pb-6 text-7xl font-bold   text-darkblue-800">
            تحتاج إلى مساعدين أكفاء؟
          </h2>
          <p className="mt-0 pb-8 text-4xl   text-darkblue-600">
            اعثر على مرافقين و أطباء محترفين و متخصصين يرافقون زبائنك و يوفرون عليهم الكثير من الوقت والجهد.
          </p>

          <aside className="h-80"></aside>
        </div>
        <div className="flex justify-center gap-8">
          <Image src="/assets/miqat/svg/doctor.svg" width={600} height={600} alt='' className='h-auto w-full' />
        </div>
      </aside>
      <div className="  bg-turqoi-50 relative ">
        <Image className=' absolute top-0 left-0 w-60' src='/assets/miqat/svg/cloud-top.svg' width={600} height={600} alt='' />
        <Image className=' absolute bottom-0 right-0 w-96' src='/assets/miqat/svg/cloud-bottom.svg' width={600} height={600} alt='' />
        <div className=" py-28 pb-36 container mx-auto relative z-10 ">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            <div className="d">
              <aside className="h-40 relative mb-8">
                <div className="absolute bottom-0 right-0 left-0">
                  <HomepageEscortsSearchForm />
                </div>
              </aside>
              <div className="flex gap-10 items-center">
                <span className=" shadow-lg shadow-darkblue-100 rounded-full flex flex-col justify-center items-center w-24 h-24 bg-white ">
                  <Icons.Social.Youtube className='w-16 h-16 text-red-500 ' />
                </span>
                <div className="flex flex-col gap-0">
                  <span className="text-4xl font-bold text-slate-600">شاهد الفيديو</span>
                  <span className="text-2xl text-slate-600">يشرح العملية بشكل دقيق كما يوضح كيفية تقديم الطلب</span>
                </div>
              </div>
            </div>
            <div className="d">
              <h2 className="mt-0 pb-6 text-7xl font-bold   text-darkblue-800">
                خدمات طبية متميزة
              </h2>
              <p className="mt-0 pb-8 text-4xl   text-darkblue-600">
                توفر طواقم طبية متكاملة لمرافقتكم طول الوقت، أدوات طبية حديثة، تدريب واسع في التعامل مع كبار السن.
              </p>
              <Link href='/escorts'
                className=' font-bold text-center text-2xl inline-flex justify-center gap-6 items-center py-3 rounded-lg px-8 text-white bg-red2-800 hocus:bg-red2-950 transition-all'
              >
                <span className="d">معرفة المزيد</span>
                <Icons.Chevron.Left className='w-6 h-6' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageEscortsSection; 