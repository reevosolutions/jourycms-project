

'use client';
import useCMSContent from '@/hooks/use-cms-content';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type HomepagePartnersSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepagePartnersSection: React.FC<HomepagePartnersSectionProps> = ({ children }) => {
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

      <div className=" text-center pb-16 ">
        <div className=" py-16 pb-4">
          <h2 className="mt-0 pb-16 text-6xl font-bold text-center  text-darkblue-900">
            شركاؤنا في النجاح
          </h2>

          <div className="flex justify-center gap-8">
            <Image src="/assets/miqat/images/partners/partner1.png" width={196} height={196} alt='' />
            <Image src="/assets/miqat/images/partners/partner2.png" width={196} height={196} alt='' />
            <Image src="/assets/miqat/images/partners/partner3.png" width={196} height={196} alt='' />
            <Image src="/assets/miqat/images/partners/partner4.png" width={196} height={196} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepagePartnersSection; 