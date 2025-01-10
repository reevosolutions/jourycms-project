"use client";
import React from "react";

import JoinOurTeamForm from "@/themes/miqat/components/forms/join-our-team.from";

// eslint-disable-next-line no-undef
export type JoinOurTeamSectionProps = JouryCMS.Theme.ComponentProps & {};

const JoinOurTeamSection: React.FC<JoinOurTeamSectionProps> = ({}) => {
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
      <div className="container mx-auto py-12">
        <div className="pt-16">
          <h2 className="mt-0 pb-4 text-3xl font-bold text-darkblue-800 sm:text-4xl md:text-5xl">
            هل انت مرشد امام ممرض طبيب
          </h2>
          <p className="mt-0 pb-0 text-xl font-medium text-darkblue-700 sm:text-2xl">
            وتريد ان تكون مرافق لفوج المعتمرين او الحجاج
          </p>
          <p className="mt-0 pb-8 text-xl font-medium text-darkblue-700 sm:text-2xl">
            سجل الان
          </p>

          <JoinOurTeamForm />
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeamSection;
