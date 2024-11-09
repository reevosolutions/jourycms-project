'use client';
import useCMSContent from '@/hooks/use-cms-content';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type HomepageCallToActionSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageCallToActionSection: React.FC<HomepageCallToActionSectionProps> = ({ children }) => {
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

      <div className=" text-center ">
        <div className=" bg-beige-50 py-16 pb-4">
          <h2 className="mt-0 pb-16 text-8xl font-bold text-center text-red2-800">
            {getWebsiteConfigValue('name')}
          </h2>

          <p className=" text-beige-700 text-5xl mb-6 font-bold">أنشئ حسابا الآن و تمتع بأرقى الخدمات
          </p>
          <p className=" text-beige-700 text-3xl lg:w-3/5 px-4 mx-auto">
            سجل نفسك بخطوات بسيطة ليملك كل جديد حول رحلات العمرة في الجزائر، ستجد آلاف العروض و المفاجآت السارة ، خدمات سوف تجعل من خدماتك أكثر احترافية و تميز سجل اليوم و كن شريكا استراتيجيا.
          </p>
          <div className="flex justify-center py-16 pb-12">
            <Link href="/register" className="bg-red2-800 text-white text-6xl px-16 py-6 rounded-lg hocus:bg-red2-900 font-bold duration-200 transition-all">
              نعم، سجلني الآن
            </Link>

          </div>
          <p className=" text-beige-700 text-3xl lg:w-3/5 px-4 mx-auto pb-6">
            اتصل بنا للمزيد من المعلومات
          </p>

          <a href={`https://wa.me/${getWebsiteConfigValue('contact_whatsapp')}`} target="_blank" className=' font-bold text-4xl flex justify-center gap-4 items-center text-beige-900 hocus:text-beige-700 transition-all' dir='ltr'>
            <Image src="/assets/miqat/svg/whatsapp-symbol-logo-svgrepo-com.svg" width={36} height={36} alt='' />
            <span>
              {getWebsiteConfigValue('contact_whatsapp')}
            </span>
          </a>

        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 360"><path fill="#e5d3a5" fillOpacity="1" d="M0,360L1440,96L1440,0L0,0Z"></path></svg>

      </div>
    </section>

  );
}

export default HomepageCallToActionSection; 