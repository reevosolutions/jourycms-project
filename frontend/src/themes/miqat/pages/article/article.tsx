import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import Image from "next/image";
import Link from "next/link";

import PageNotFound from "../../components/page-not-found";
import {serverSdk} from "../../data";
import {getMetaFieldValueLabel, hasMetaField} from "../../data/meta-fields";
import {LuAlarmClock, LuCalendarDays, LuCircleDollarSign} from "react-icons/lu";
import {format} from "date-fns";
import {formatAmount} from "@/lib/utilities/strings";
import {PiAirplaneTilt, PiTrolleySuitcase} from "react-icons/pi";
import {TbPlaneArrival, TbPlaneDeparture} from "react-icons/tb";
import {GiDuration} from "react-icons/gi";
import {HiOutlineTicket} from "react-icons/hi2";
import {BsMoonStars, BsSuitcase} from "react-icons/bs";
import {IoFastFoodOutline, IoMoonOutline} from "react-icons/io5";
import {cn} from "@/lib/utils";
import {MdOutlineLocalHotel} from "react-icons/md";
import initLogger, {LoggerContext} from "@/lib/logging";
import {ArticleTypeSlug} from "../../config";
import OmrahArticlePage from "./article.omrah";
import AgencyArticlePage from "./article.agency";
import DefaultArticlePage from "./article.default";

const logger = initLogger(LoggerContext.COMPONENT, "Article");

type ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne.Response;
type Article = Levelup.CMS.V1.Content.Entity.Article;

export type PageProps = JouryCMS.Theme.PageProps & {
  initialData?: ApiAlias;
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null;
};

const ArticlePage: React.FC<PageProps> = ({route, initialData}) => {
  const article = initialData?.data;
  const articleType = article?.article_type
    ? initialData?.edge?.article_types?.[article.article_type]
    : undefined;
  

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {articleType?.slug === ArticleTypeSlug.OMRAH ? (
          <OmrahArticlePage {...{route, initialData}} />
        ) : articleType?.slug === ArticleTypeSlug.AGENCY ? (
          // <AgencyArticlePage {...{route, initialData}} />
          <DefaultArticlePage {...{route, initialData}} />
        ) : (
          <DefaultArticlePage {...{route, initialData}} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ArticlePage;
