"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Icons from "@/features/admin/ui/icons";
import AgencyOnlyView from "@/guards/agency-only.view";
import OmrahOnDemandForm from "@/themes/miqat/components/forms/omrah-on-demand.from";

// eslint-disable-next-line no-undef
export type OmrahOnDemandSectionProps = JouryCMS.Theme.ComponentProps & {};

const OmrahOnDemandSection: React.FC<OmrahOnDemandSectionProps> = ({}) => {
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
    <AgencyOnlyView>
      <section className="bg-gray-50/50">
        <div className="container mx-auto py-28">
            <div className="pt-16">
              <h2 className="mt-0 pb-8 text-3xl font-bold text-darkblue-800 sm:text-4xl md:text-5xl">
                عمرة على المقاس
              </h2>

                <OmrahOnDemandForm />              
            </div>
        </div>
      </section>
    </AgencyOnlyView>
  );
};

export default OmrahOnDemandSection;
