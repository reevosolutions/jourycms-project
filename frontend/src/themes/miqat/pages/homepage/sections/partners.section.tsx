"use client";
import Image from "next/image";
import React from "react";

// eslint-disable-next-line no-undef
export type HomepagePartnersSectionProps = JouryCMS.Theme.ComponentProps & {};

const HomepagePartnersSection: React.FC<
  HomepagePartnersSectionProps
> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="bg-gray-50/50">
      <div className="pb-16 text-center">
        <div className="py-16 pb-4 md:block">
          <h2 className="mt-0 pb-16 text-center text-3xl font-bold text-darkblue-900 sm:text-5xl md:text-6xl">
            شركاؤنا في النجاح
          </h2>

          <div className="mx-auto grid max-w-3xl grid-cols-2 content-around items-center md:grid-cols-4 md:gap-8">
            <Image
              src="/assets/miqat/images/partners/partner1.png"
              width={196}
              height={196}
              alt=""
              className="mx-auto"
            />
            <Image
              src="/assets/miqat/images/partners/partner2.png"
              width={196}
              height={196}
              alt=""
              className="mx-auto"
            />
            {/* <Image
              src="/assets/miqat/images/partners/partner3.png"
              width={196}
              height={196}
              alt=""
              className="mx-auto"
            />
            <Image
              src="/assets/miqat/images/partners/partner4.png"
              width={196}
              height={196}
              alt=""
              className="mx-auto"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepagePartnersSection;
