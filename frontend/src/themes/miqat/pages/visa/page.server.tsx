import OrderVisaForm from "@/themes/miqat/components/forms/order-visa.form";
import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";

export type PageProps = JouryCMS.Theme.PageProps & {
  showPagination?: boolean;
  pathPattern?: `/${string}/:page`;
  count: number;
  page: number;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
  data?: Levelup.CMS.V1.Content.Api.Articles.List.Response;
  error?: any;
};

const ThemePage_Server: React.FC<PageProps> = ({
  route,
  showPagination = true,
  pathPattern,
  count = 12,
  page = 1,
  data,
  articleType,
  error,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="pt-16">
          <h2 className="mt-0 pb-8 text-3xl font-bold text-darkblue-800 sm:text-4xl md:text-5xl">
            طلب تأشيرة السعودية
          </h2>

          <OrderVisaForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ThemePage_Server;
