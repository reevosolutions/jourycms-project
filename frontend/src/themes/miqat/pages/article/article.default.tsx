import Image from "next/image";
import * as React from "react";

import initLogger, { LoggerContext } from "@/lib/logging";
import { formatAmount } from "@/lib/utilities/strings";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BsGlobeAsiaAustralia, BsMoonStars, BsSuitcase } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineTicket } from "react-icons/hi2";
import { IoFastFoodOutline, IoMoonOutline } from "react-icons/io5";
import {
  LuAlarmClock,
  LuCalendarDays,
  LuCircleDollarSign,
  LuMoonStar,
} from "react-icons/lu";
import { MdOutlineLocalHotel } from "react-icons/md";
import {
  PiAirplaneTilt,
  PiGenderIntersexBold,
  PiTrolleySuitcase,
} from "react-icons/pi";
import { TbPlaneArrival, TbPlaneDeparture } from "react-icons/tb";
import PageNotFound from "../../components/page-not-found";
import RoleIcon from "../../components/role-icon";
import { TArticleTypeSlug } from "../../config";
import { serverSdk } from "../../data";
import {
  getMetaField,
  getMetaFieldValueLabel,
  hasMetaField,
} from "../../data/meta-fields";

const logger = initLogger(LoggerContext.COMPONENT, "Article");

type ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne.Response;
type Article = Levelup.CMS.V1.Content.Entity.Article;

export type ComponentProps = JouryCMS.Theme.ComponentProps & {
  initialData?: ApiAlias;
};

const DefaultArticleComponent: React.FC<ComponentProps> = ({initialData}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    DATA                                    */
  /* -------------------------------------------------------------------------- */
  const article = initialData?.data;
  const articleType:
    | (Omit<Levelup.CMS.V1.Content.Entity.ArticleType, "slug"> & {
        slug: TArticleTypeSlug;
      })
    | null
    | undefined = article?.article_type
    ? (initialData?.edge?.article_types?.[article.article_type] as any)
    : undefined;
  const agency =
    initialData?.edge?.linked_articles?.[article?.meta_fields?.agency];
  const agencyArticleType = agency?.article_type
    ? initialData?.edge?.article_types?.[agency?.article_type]
    : null;
  const airelines_company =
    initialData?.edge?.linked_articles?.[
      article?.meta_fields?.airelines_company
    ];
  const departure_airoport =
    initialData?.edge?.linked_articles?.[
      article?.meta_fields?.departure_airoport
    ];
  const arrival_airoport =
    initialData?.edge?.linked_articles?.[
      article?.meta_fields?.arrival_airoport
    ];
  const mekkah_hotel =
    initialData?.edge?.linked_articles?.[article?.meta_fields?.mekkah_hotel];
  const medina_hotel =
    initialData?.edge?.linked_articles?.[article?.meta_fields?.medina_hotel];
  const shrines_at_mekkah: Article[] =
    article?.meta_fields?.shrines_at_mekkah
      ?.map((id: string) => initialData?.edge?.linked_articles?.[id])
      .filter((a: Article) => !!a) || [];
  const shrines_at_medina: Article[] =
    article?.meta_fields?.shrines_at_medina
      ?.map((id: string) => initialData?.edge?.linked_articles?.[id])
      .filter((a: Article) => !!a) || [];

  logger.value("article", article);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return article ? (
    <div className="article-page mb-16">
      <div className="mb-4"></div>
      <div className="mb-6 mt-8 flex flex-col items-center justify-center">
        {hasMetaField(article, "avatar") ? (
          <div className="relative mb-4 aspect-square w-32">
            <Image
              priority
              placeholder="blur"
              blurDataURL={serverSdk.storage.utils.getImageBlurredUrl(
                getMetaField(article, "avatar", "image", false)?.id as string,
              )}
              className="rounded-7xl h-full w-full object-cover"
              src={serverSdk.storage.utils.getImageUrl(
                getMetaField(article, "avatar", "image", false)?.id as string,
                {width: 450, height: 450},
              )}
              alt={article.title}
              width={450}
              height={450}
            />
          </div>
        ) : null}
        {hasMetaField(article, "logo") ? (
          <div className="relative mb-4 aspect-square w-32">
            <Image
              priority
              placeholder="blur"
              blurDataURL={serverSdk.storage.utils.getImageBlurredUrl(
                getMetaField(article, "logo", "image", false)?.id as string,
              )}
              className="rounded-7xl h-full w-full object-cover"
              src={serverSdk.storage.utils.getImageUrl(
                getMetaField(article, "logo", "image", false)?.id as string,
                {width: 450, height: 450},
              )}
              alt={article.title}
              width={450}
              height={450}
            />
          </div>
        ) : null}
        <h1 className="mb-4 text-center text-4xl text-gray-800 md:text-5xl">
          {article.title}
        </h1>
        {articleType?.slug === "doctor" || articleType?.slug === "escort" ? (
          <div className="mb-4 flex items-center justify-center gap-4 rounded-full bg-beige-50/50 px-6 py-1 pe-8 text-4xl text-red2-600">
            <span className="w-8">
              <RoleIcon role={articleType?.slug} />
            </span>
            <span className="">{articleType?.labels?.singular}</span>
          </div>
        ) : null}
      </div>
      {article.featured_image?.id && (
        <div className="relative mb-6 aspect-video w-full md:aspect-21/9">
          <Image
            priority
            placeholder="blur"
            blurDataURL={serverSdk.storage.utils.getImageBlurredUrl(
              article.featured_image?.id,
            )}
            className="h-full w-full rounded-xl object-cover"
            src={serverSdk.storage.utils.getImageUrl(
              article.featured_image?.id,
              {width: 1050, height: 450},
            )}
            alt={article.title}
            width={1050}
            height={450}
          />
        </div>
      )}
      <aside className="mx-auto mb-12 w-full">
        {agency && (
          <div className="my-2 flex items-center gap-3">
            {agency.meta_fields?.logo && (
              <Image
                className="h-12 w-12 rounded-full border border-slate-100 shadow-md shadow-slate-200"
                src={serverSdk.storage.utils.getImageUrl(
                  agency.meta_fields.logo.id,
                  {
                    width: 100,
                    height: 100,
                  },
                )}
                width={100}
                height={100}
                alt={agency.title || ""}
              />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-3xl text-darkblue-900">{agency.title}</span>
              <span className="text-2xl leading-tight text-yellow-600">
                {getMetaFieldValueLabel(
                  agencyArticleType,
                  "state",
                  agency.meta_fields.state,
                )}
              </span>
            </div>
          </div>
        )}
      </aside>

      <div className="flex flex-col gap-6 xl:flex-row">
        <aside className="relative flex-shrink-0 flex-grow xl:w-80 xl:flex-grow-0 xl:rounded-2xl xl:bg-slate-50/50 xl:px-4 xl:py-6">
          <div className="sticky top-6 grid gap-6 text-2xl sm:grid-cols-2 xl:grid-cols-1">
            {/* field */}
            {hasMetaField(article, "medical_speciality") && (
              <div className="items-top flex flex-row gap-4">
                <FaUserDoctor className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"التخصص"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "medical_speciality",
                      article.meta_fields.medical_speciality,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "sex") && (
              <div className="items-top flex flex-row gap-4">
                <PiGenderIntersexBold className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"الجنس"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "sex",
                      article.meta_fields.sex,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "country") && (
              <div className="items-top flex flex-row gap-4">
                <BsGlobeAsiaAustralia className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"الدولة"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "country",
                      article.meta_fields.country,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "state") && (
              <div className="items-top flex flex-row gap-4">
                <HiLocationMarker className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"الولاية"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "state",
                      article.meta_fields.state,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "city") && (
              <div className="items-top flex flex-row gap-4">
                <HiOutlineLocationMarker className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"البلدية"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "city",
                      article.meta_fields.city,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "ksa_city") && (
              <div className="items-top flex flex-row gap-4">
                <HiOutlineLocationMarker className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"المدينة"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "ksa_city",
                      article.meta_fields.ksa_city,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "medina_mekkah") && (
              <div className="items-top flex flex-row gap-4">
                <LuMoonStar className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"المدينة أو مكة"}
                  </span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "medina_mekkah",
                      article.meta_fields.medina_mekkah,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "trip_duration") && (
              <div className="items-top flex flex-row gap-4">
                <GiDuration className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"مدة الرحلة"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "trip_duration",
                      article.meta_fields.trip_duration,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "ramdhan_trip") && (
              <div className="items-top flex flex-row gap-4">
                <IoMoonOutline className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"رحلة رمضان"}</span>
                  <span
                    className={cn(
                      "d",
                      article.meta_fields.ramdhan_trip &&
                        "font-bold text-green-600",
                    )}
                  >
                    {article.meta_fields.ramdhan_trip ? "نعم" : "لا"}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "price") && (
              <div className="items-top flex flex-row gap-4">
                <LuCircleDollarSign className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"السعر"}</span>
                  <span className="d">
                    {formatAmount(article.meta_fields.price, ",", 0)} DA
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {hasMetaField(article, "flight_date") && (
              <div className="items-top flex flex-row gap-4">
                <LuCalendarDays className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"تاريخ الرحلة"}
                  </span>
                  <span className="d">
                    {format(article.meta_fields.flight_date, "dd / MM / YYY")}
                  </span>
                </div>
              </div>
            )}

            {/* time */}

            {hasMetaField(article, "flight_time") && (
              <div className="items-top flex flex-row gap-4">
                <LuAlarmClock className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"توقيت الرحلة"}
                  </span>
                  <span className="d">{article.meta_fields.flight_time}</span>
                </div>
              </div>
            )}

            {/* field */}
            {airelines_company && (
              <div className="items-top flex flex-row gap-4">
                <PiAirplaneTilt className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"شركة الطيران"}
                  </span>
                  <span className="d">{airelines_company.title}</span>
                </div>
              </div>
            )}
            {/* field */}
            {article.meta_fields.trip_type && (
              <div className="items-top flex flex-row gap-4">
                <BsSuitcase className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"نوع الرحلة"}</span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "trip_type",
                      article.meta_fields.trip_type,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {article.meta_fields.flight_number && (
              <div className="items-top flex flex-row gap-4">
                <HiOutlineTicket className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"رقم الرحلة"}</span>
                  <span className="d">{article.meta_fields.flight_number}</span>
                </div>
              </div>
            )}
            {/* field */}
            {departure_airoport && (
              <div className="items-top flex flex-row gap-4">
                <TbPlaneDeparture className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"مطار الاقلاع"}
                  </span>
                  <span className="d">{departure_airoport.title}</span>
                </div>
              </div>
            )}
            {/* field */}
            {arrival_airoport && (
              <div className="items-top flex flex-row gap-4">
                <TbPlaneArrival className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"مطار الوصول"}
                  </span>
                  <span className="d">{arrival_airoport.title}</span>
                </div>
              </div>
            )}
            {/* field */}
            {article.meta_fields.entry_point && (
              <div className="items-top flex flex-row gap-4">
                <PiTrolleySuitcase className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"مدينة الدخول"}
                  </span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "entry_point",
                      article.meta_fields.entry_point,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* field */}
            {shrines_at_mekkah.length > 0 && (
              <div className="items-top flex flex-row gap-4">
                <span className="inline-block px-1">
                  <BsMoonStars className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"المزارات في مكة"}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {shrines_at_mekkah.map(a => (
                      <li className="d" key={a._id}>
                        {a.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* field */}
            {shrines_at_medina.length > 0 && (
              <div className="items-top flex flex-row gap-4">
                <span className="inline-block px-1">
                  <BsMoonStars className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"المزارات في المدينة المنورة"}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {shrines_at_medina.map(a => (
                      <li className="d" key={a._id}>
                        {a.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* field */}
            {mekkah_hotel && (
              <div className="items-top flex flex-row gap-4">
                <MdOutlineLocalHotel className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الفندق في مكة المكرمة"}
                  </span>
                  <span className="">{mekkah_hotel.title}</span>
                </div>
              </div>
            )}
            {/* field */}
            {article.meta_fields.subsistence_at_mekkah?.length > 0 && (
              <div className="items-top flex flex-row gap-4">
                <IoFastFoodOutline className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الإعاشة في مكة المكرمة"}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.subsistence_at_mekkah.map(
                      (field: string) => (
                        <li className="d" key={field}>
                          {getMetaFieldValueLabel(
                            articleType,
                            "subsistence_at_mekkah",
                            field,
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
            {/* field */}
            {medina_hotel && (
              <div className="items-top flex flex-row gap-4">
                <MdOutlineLocalHotel className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الفندق في المدينة المنورة"}
                  </span>
                  <span className="">{medina_hotel.title}</span>
                </div>
              </div>
            )}
            {/* field */}
            {article.meta_fields.subsistence_at_medina?.length > 0 && (
              <div className="items-top flex flex-row gap-4">
                <IoFastFoodOutline className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الإعاشة في المدينة المنورة"}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.subsistence_at_medina.map(
                      (field: string) => (
                        <li className="d" key={field}>
                          {getMetaFieldValueLabel(
                            articleType,
                            "subsistence_at_medina",
                            field,
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </aside>
        <div
          className="prose mx-auto mb-6 flex-grow text-2xl text-darkblue-700 md:text-3xl"
          dangerouslySetInnerHTML={{__html: article.body}}
        />
      </div>
    </div>
  ) : initialData?.error ? (
    <PageNotFound />
  ) : null;
};

export default DefaultArticleComponent;
