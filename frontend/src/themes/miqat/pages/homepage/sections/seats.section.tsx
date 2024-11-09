

'use client';
import Icons from '@/features/admin/ui/icons';
import useCMSContent from '@/hooks/use-cms-content';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type HomepageSeatsSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageSeatsSection: React.FC<HomepageSeatsSectionProps> = ({ children }) => {
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
      <div className=" py-28 container mx-auto ">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          <div className="pt-16">
            <h2 className="mt-0 pb-8 text-7xl font-bold   text-darkblue-800">
              بيع أو شراء مقاعد في الطائرة
            </h2>
            <h3 className="mt-0 pb-8 text-5xl   text-darkblue-800">
              عندك مقاعد إضافية أو لديك نقص في الأماكن؟
            </h3>
            <p className="mt-0 pb-8 text-4xl   text-darkblue-600">
              نقدم لك خدمة فريدة لبيع أو استبدال أو حتى منح مقاعد الطائرة الفائضة لأشخاص آخرين هم في أشد الحاجة لها.
            </p>

            <div className=" grid grid-cols-2 gap-6 ">
              <Link href='/seat-requests/order'
                className=' font-bold text-center text-3xl flex justify-center gap-4 items-center py-4 rounded-lg px-4 text-white bg-red2-800 hocus:bg-red2-950 transition-all'
              >
                قدم طلبا الآن
              </Link>
              <Link href='/seat-requests'
                className=' font-bold text-center text-3xl flex justify-center gap-4 items-center py-4 rounded-lg px-4  text-darkblue-800 border-darkblue-500 hocus:bg-slate-50 border-2 transition-all'
              >
                قدم طلبا الآن
              </Link>
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <Image src="/assets/miqat/svg/fly.svg" width={600} height={600} alt='' className='h-auto w-full' />
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <span className=" box-shadow-lg shadow-slate-200 rounded-full flex flex-col justify-center items-center w-24 h-24">
            <Icons.Social.Youtube className='w-16 h-16 text-red-500 ' />
          </span>
          <div className="flex flex-col gap-0">
            <span className="text-5xl font-bold text-slate-500">شاهد الفيديو</span>
            <span className="text-4xl text-slate-500">يشرح العملية بشكل دقيق كما يوضح كيفية تقديم الطلب</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageSeatsSection; 