"use client";
import React from "react";

import OrderVisaForm from "@/themes/miqat/components/forms/order-visa.form";

// eslint-disable-next-line no-undef
export type OrderVisaSectionProps = JouryCMS.Theme.ComponentProps & {};

const OrderVisaSection: React.FC<OrderVisaSectionProps> = ({}) => {
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
            <h2 className="mt-0 pb-8 text-3xl font-bold text-darkblue-800 sm:text-4xl md:text-5xl">
              تأشيرة السعودية
            </h2>

            <OrderVisaForm />
          </div>
        </div>
      </section>
  );
};

export default OrderVisaSection;
