import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import Image from "next/image";
import Link from "next/link";

import PageNotFound from "../../components/page-not-found";
import {serverSdk} from "../../data";
import {
  getMetaFieldLabel,
  getMetaFieldValueLabel,
  hasMetaField,
} from "../../data/meta-fields";
import {
  LuAlarmClock,
  LuCalendarDays,
  LuCircleDollarSign,
  LuPencil,
} from "react-icons/lu";
import {format} from "date-fns";
import {formatAmount} from "@/lib/utilities/strings";
import {
  PiAirplaneTilt,
  PiStarHalfLight,
  PiTrolleySuitcase,
} from "react-icons/pi";
import {TbPlaneArrival, TbPlaneDeparture} from "react-icons/tb";
import {GiDuration} from "react-icons/gi";
import {HiOutlineTicket} from "react-icons/hi2";
import {BsMoonStars, BsSuitcase} from "react-icons/bs";
import {IoFastFoodOutline, IoMoonOutline} from "react-icons/io5";
import {cn} from "@/lib/utils";
import {MdOutlineLocalHotel} from "react-icons/md";
import initLogger, {LoggerContext} from "@/lib/logging";
import {ArticleTypeSlug} from "../../config";
import AdminOnlyGuard from "@/guards/admin-only.guard";
import AdminOnlyView from "@/guards/admin-only.view";
import ShareControl from "../../components/share-control";
import {
  TArticleType,
  TArticleTypeCustomFieldName,
  TCustomArticle,
} from "../../data/ar.types.seed";
import moment from "moment";
import {FaHandHoldingMedical} from "react-icons/fa";
import {GrGroup} from "react-icons/gr";
import {RiServiceLine} from "react-icons/ri";
import {ImGift} from "react-icons/im";
import OrderOfferForm from "../../components/forms/order-offer.from";

const logger = initLogger(LoggerContext.COMPONENT, "Article");

type ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne.Response;
type Article = TCustomArticle<"omrah">;
type ArticleType = TArticleType<"omrah">;
type ArticleTypeCustomFieldName = TArticleTypeCustomFieldName<"omrah">;

export type PageProps = JouryCMS.Theme.PageProps & {
  initialData?: ApiAlias;
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null;
};

const OmrahArticlePage: React.FC<PageProps> = ({route, initialData}) => {
  const article: Article | undefined = initialData?.data as Article;
  const articleType: ArticleType | undefined = article?.article_type
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
      <div className="mb-4">
        <h1 className="mb-6 mt-8 flex items-center justify-center gap-4 text-4xl text-gray-800 md:text-5xl">
          {article.title}
          <AdminOnlyView>
            <Link
              href={`/admin/articles/edit/${article._id}`}
              className="ms-4 inline-block rounded-full p-2 text-gray-400 hocus:bg-gray-100 hocus:text-gray-600"
            >
              <LuPencil className="h-5 w-5" />
            </Link>
          </AdminOnlyView>
        </h1>
      </div>
      <div className="relative mb-6 aspect-video w-full md:aspect-21/9">
        <Image
          priority
          placeholder="blur"
          blurDataURL={
            article.featured_image?.id
              ? serverSdk.storage.utils.getImageBlurredUrl(
                  article.featured_image?.id,
                )
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nAHuABH/ANXp8tfs99bu+s3q+8Lo+rbd7q3X6afc9J3Z847Q8HnF6gD1+//y+//p9v3m9//p///F09eqtLnP+P+44vOp2/OWz+4Aj5OYytDS8PX64+vxwszSgoKCfnp4scHJzPH+td3zp9HqADxAPFNWVZ2bloOEgIB4c4NyaHhsXYV+d6eho7K4vZudpAA6Kxg7LyFANy1URjtiUUdsVkpJOixrUUNqRTJuTDl6X0sAAAESBRMiGy1AKDhLQUZVPztIIBYcRz9DdmplkHpnf3RkADZLWDE9Q0ZSWkRQXlVgbG9zeIqFfaWejoqGeFlWTWNdVBZSgKQv2x7tAAAAAElFTkSuQmCC"
          }
          className="h-full w-full rounded-xl object-cover"
          src={
            article.featured_image?.id
              ? serverSdk.storage.utils.getImageUrl(
                  article.featured_image?.id,
                  {width: 1050, height: 450},
                )
              : "/assets/miqat/images/hajj-placeholder.webp"
          }
          alt={article.title}
          width={1050}
          height={450}
        />
      </div>
      <aside className="mx-auto mb-12 w-full">
        {agency && (
          <Link
            className="group my-2 flex items-center gap-3"
            href={agency.slug}
          >
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
              <span className="text-3xl text-darkblue-900 transition-all duration-300 group-hocus:text-red2-500">
                {agency.title}
              </span>
              <span className="text-2xl leading-tight text-yellow-600">
                {getMetaFieldValueLabel(
                  agencyArticleType,
                  "state",
                  agency.meta_fields.state,
                )}
              </span>
            </div>
          </Link>
        )}
      </aside>

      <div className="flex flex-col gap-6">
        <aside className="relative flex-shrink-0 flex-grow">
          <div className="sticky top-6 mx-auto mb-8 grid max-w-4xl gap-6 text-xl sm:grid-cols-2 xl:grid-cols-2">
            {/* ------------------------- program_type ------------------------- */}
            {hasMetaField(article, "program_type") && (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <PiStarHalfLight className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "program_type")}
                  </span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "program_type",
                      article.meta_fields.program_type,
                    )}
                  </span>
                </div>
              </div>
            )}
            {/* ------------------------- trip_type ------------------------- */}
            {hasMetaField(article, "trip_type") ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <PiStarHalfLight className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "trip_type")}
                  </span>
                  <span className="d">
                    {getMetaFieldValueLabel(
                      articleType,
                      "trip_type",
                      article.meta_fields.trip_type,
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}

            {/* ------------------------- trip_start_date ------------------------- */}
            {hasMetaField<Article>(article, "trip_start_date") && (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <LuCalendarDays className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-grow flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"تاريخ الرحلة"}
                  </span>
                  <ul className="w-full">
                    <li className="flex items-center justify-between gap-5">
                      <span className="font-medium">من</span>
                      <span>
                        {format(
                          article.meta_fields.trip_start_date,
                          "dd / MM / YYY",
                        )}
                      </span>
                    </li>
                    {hasMetaField<Article>(article, "trip_end_date") && (
                      <li className="flex items-center justify-between gap-5">
                        <span className="font-medium">إلي</span>
                        <span>
                          {format(
                            article.meta_fields.trip_end_date,
                            "dd / MM / YYY",
                          )}
                        </span>
                      </li>
                    )}
                    <li className="flex items-center justify-between gap-5">
                      <span className="font-medium">المدة</span>
                      <span>
                        {moment(article.meta_fields.trip_end_date).diff(
                          article.meta_fields.trip_start_date,
                          "days",
                        )}{" "}
                        أيام
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* ------------------------- flight_time ------------------------- */}
            <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
              <LuAlarmClock className="h-8 w-8 text-beige-50" />
              <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                <span className="text-xl text-slate-500">{"توقيت الرحلة"}</span>
                <span className="d">{article.meta_fields.flight_time}</span>
              </div>
            </div>

            {/* ------------------------- ramdhan_trip ------------------------- */}
            {(articleType as any)?.slug === ArticleTypeSlug.OMRAH ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- trip_start_date ------------------------- */}
            <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
              <LuCircleDollarSign className="h-8 w-8 text-beige-50" />
              <div className="-mt-1 flex flex-grow flex-col items-start justify-start gap-0">
                <span className="text-xl text-slate-500">{"السعر"}</span>
                <ul className="flex w-full list-inside list-disc flex-col border-slate-300">
                  {[
                    {key: "price_of_five_persons_room", label: "غرفة خماسية"},
                    {key: "price_of_four_persons_room", label: "غرفة رباعية"},
                    {
                      key: "price_of_three_persons_room",
                      label: "غرفة ثلاثية",
                    },
                    {key: "price_of_two_persons_room", label: "غرفة ثنائية"},
                    {
                      key: "price_of_single_person_room",
                      label: "غرفة أحادية",
                    },
                    {key: "price_of_child_with_bed", label: " طفل مع سرير"},
                    {
                      key: "price_of_child_without_bed",
                      label: " طفل بدون سرير",
                    },
                    {key: "price_of_infant", label: " رضيع"},
                  ].map(({key, label}) =>
                    (article.meta_fields as any)[key] ? (
                      <li
                        className="mb-1 flex items-center justify-between gap-5"
                        key={key}
                      >
                        <span className="text-lg font-medium">{label}</span>
                        <span className="text-lg">
                          {formatAmount(
                            (article.meta_fields as any)[key],
                            ",",
                            2,
                          )}
                        </span>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            </div>

            {/* ------------------------- airelines_company ------------------------- */}
            {airelines_company ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <PiAirplaneTilt className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"شركة الطيران"}
                  </span>
                  <span className="d">{airelines_company.title}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}

            {/* ------------------------- flight_number ------------------------- */}
            {article.meta_fields.flight_number ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <HiOutlineTicket className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">{"رقم الرحلة"}</span>
                  <span className="d">{article.meta_fields.flight_number}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- departure_airoport ------------------------- */}
            {departure_airoport ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <TbPlaneDeparture className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"مطار الاقلاع"}
                  </span>
                  <span className="d">{departure_airoport.title}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- trip_start_date ------------------------- */}
            {arrival_airoport ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <TbPlaneArrival className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"مطار الوصول"}
                  </span>
                  <span className="d">{arrival_airoport.title}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- entry_point ------------------------- */}
            {article.meta_fields.entry_point ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- placeholder ------------------------- */}
            <div className="placeholder"></div>
            {/* ------------------------- shrines_at_mekkah ------------------------- */}
            {shrines_at_mekkah.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- shrines_at_medina ------------------------- */}
            {shrines_at_medina.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- mekkah_hotel ------------------------- */}
            {mekkah_hotel ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <MdOutlineLocalHotel className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الفندق في مكة المكرمة"}
                  </span>
                  <span className="">{mekkah_hotel.title}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- subsistence_at_mekkah ------------------------- */}
            {article.meta_fields.subsistence_at_mekkah?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- medina_hotel ------------------------- */}
            {medina_hotel ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <MdOutlineLocalHotel className="h-8 w-8 text-beige-50" />
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {"الفندق في المدينة المنورة"}
                  </span>
                  <span className="">{medina_hotel.title}</span>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- subsistence_at_medina ------------------------- */}
            {article.meta_fields.subsistence_at_medina?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
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
            ) : (
              <div className="placeholder"></div>
            )}

            {/* ------------------------- shrines_at_mekkah ------------------------- */}
            {article.meta_fields.health_services?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <span className="inline-block px-1">
                  <FaHandHoldingMedical className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "health_services")}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.health_services.map(
                      (field: string) => (
                        <li className="d" key={field}>
                          {getMetaFieldValueLabel(
                            articleType,
                            "health_services",
                            field,
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}

            {/* ------------------------- group_activities ------------------------- */}
            {article.meta_fields.group_activities?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <span className="inline-block px-1">
                  <GrGroup className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "group_activities")}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.group_activities.map(
                      (field: string) => (
                        <li className="d" key={field}>
                          {getMetaFieldValueLabel(
                            articleType,
                            "group_activities",
                            field,
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}

            {/* ------------------------- program_services ------------------------- */}
            {article.meta_fields.program_services?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <span className="inline-block px-1">
                  <RiServiceLine className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "program_services")}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.program_services.map(
                      (field: string) => (
                        <li className="d" key={field}>
                          {getMetaFieldValueLabel(
                            articleType,
                            "program_services",
                            field,
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
            {/* ------------------------- gifts ------------------------- */}
            {article.meta_fields.gifts?.length > 0 ? (
              <div className="items-top flex flex-row gap-4 rounded-xl border border-gray-200 p-4">
                <span className="inline-block px-1">
                  <ImGift className="h-6 w-6 text-beige-50" />
                </span>
                <div className="-mt-1 flex flex-col items-start justify-start gap-0">
                  <span className="text-xl text-slate-500">
                    {getMetaFieldLabel(articleType, "gifts")}
                  </span>
                  <ul className="flex list-inside list-disc flex-col border-slate-300">
                    {article.meta_fields.gifts.map((field: string) => (
                      <li className="d" key={field}>
                        {getMetaFieldValueLabel(articleType, "gifts", field)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="placeholder"></div>
            )}
          </div>
        </aside>
        <div
          className="prose mx-auto mb-6 flex-grow text-xl text-darkblue-700 md:text-2xl"
          dangerouslySetInnerHTML={{__html: article.body}}
        />
        <div className="w-4xl mx-auto mt-6 w-full max-w-4xl flex-grow rounded-3xl bg-slate-50 p-6 md:px-10">
          <h3 className="mb-3 text-center text-3xl font-bold text-slate-600">
            اطلب العرض الآن
          </h3>
          <OrderOfferForm
            article={article}
            article_type={articleType?.slug}
            agency_name={agency?.title}
          />
        </div>
        <div className="w-4xl mx-auto mt-6 w-full max-w-4xl flex-grow rounded-3xl bg-slate-50 p-6 md:px-10">
          <h3 className="mb-3 text-center text-3xl font-bold text-slate-600">
            شارك العرض
          </h3>
          <ShareControl title={article.title} path={`/${article.slug}`} />
        </div>
      </div>
    </div>
  ) : initialData?.error ? (
    <PageNotFound />
  ) : null;
};

export default OmrahArticlePage;

//  router.push(setPathParams(adminRoutes.articles._.edit.path, {id: data._id}));
