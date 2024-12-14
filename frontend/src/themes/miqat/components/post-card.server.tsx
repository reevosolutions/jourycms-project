import {formatAmount} from "@/lib/utilities/strings";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {serverSdk} from "../data";
import {getMetaFieldValueLabel} from "../data/meta-fields";

import initLogger, {LoggerContext} from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import {cn} from "@/lib/utils";

export type PostCard_ServerProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response["edge"]>;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
};

const PostCard_Server: React.FC<PostCard_ServerProps> = ({
  data,
  edge,
  articleType,
}) => {
  const agency = edge?.linked_articles?.[data.meta_fields.agency] || null;
  const airelinesCompany =
    edge?.linked_articles?.[data.meta_fields.airelines_company] || null;

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Link
      href={`/${data.slug}`}
      className="relative block rounded-xl bg-white pb-20 shadow-lg shadow-slate-200 transition-all hocus:z-10 hocus:-translate-y-2 hocus:scale-105 hocus:shadow-xl hocus:shadow-slate-200"
    >
      <div className="relative h-40 w-full">
        <Image
          priority
          placeholder="blur"
          blurDataURL={
            data.featured_image?.id
              ? serverSdk.storage.utils.getImageBlurredUrl(
                  data.featured_image?.id,
                )
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nAHuABH/ANXp8tfs99bu+s3q+8Lo+rbd7q3X6afc9J3Z847Q8HnF6gD1+//y+//p9v3m9//p///F09eqtLnP+P+44vOp2/OWz+4Aj5OYytDS8PX64+vxwszSgoKCfnp4scHJzPH+td3zp9HqADxAPFNWVZ2bloOEgIB4c4NyaHhsXYV+d6eho7K4vZudpAA6Kxg7LyFANy1URjtiUUdsVkpJOixrUUNqRTJuTDl6X0sAAAESBRMiGy1AKDhLQUZVPztIIBYcRz9DdmplkHpnf3RkADZLWDE9Q0ZSWkRQXlVgbG9zeIqFfaWejoqGeFlWTWNdVBZSgKQv2x7tAAAAAElFTkSuQmCC"
          }
          className="h-full w-full rounded-b-none rounded-t-xl object-cover"
          src={
            data.featured_image?.id
              ? serverSdk.storage.utils.getImageUrl(data.featured_image?.id, {
                  width: 600,
                  height: 300,
                })
              : "/assets/miqat/images/hajj-placeholder.webp"
          }
          alt={data.title}
          width={600}
          height={300}
        />
      </div>

      <div className="px-6 py-4">
        <div className="-mx-6 pb-0">
          <h2 className="flex items-center justify-between text-3xl font-semibold text-darkblue-900">
            <span className="px-6">{data.title}</span>
            <span
              className={cn(
                "text-2xl text-white px-8 rounded-s-2xl py-1",
                data.meta_fields.program_type === "economy"
                  ? "bg-green-600"
                  : data.meta_fields.program_type === "premium"
                    ? "bg-blue-600"
                    : data.meta_fields.program_type === "deluxe"
                      ? "bg-purple-600"
                      : "bg-red-500",
              )}
            >
              {getMetaFieldValueLabel(
                articleType,
                "program_type",
                data.meta_fields.program_type,
              ) || "عادي"}
            </span>
          </h2>

          <div
            className="text-sm text-gray-500"
            dangerouslySetInnerHTML={{__html: data.body_unformatted || ""}}
          />
        </div>

        {agency && (
          <div className="my-2 flex items-center gap-3">
            {agency.meta_fields?.logo && (
              <Image
                className="h-8 w-8 rounded-full border border-slate-100 shadow-md shadow-slate-200"
                src={serverSdk.storage.utils.getImageUrl(
                  agency.meta_fields.logo.id,
                  {
                    width: 100,
                    height: 100,
                  },
                )}
                width={50}
                height={50}
                alt={agency.title || ""}
              />
            )}
            <div className="flex-flex-col leading-none">
              <span className="text-2xl leading-none text-darkblue-600">
                {agency.title}
              </span>
            </div>
          </div>
        )}

        <div className="mb-2 flex items-end justify-between gap-4">
          <p className="duration text-teal-600">
            <span className="text-xl leading-tight">{"المدة"}</span>
            <div className="duration text-2xl font-bold text-teal-600">
              {getMetaFieldValueLabel(
                articleType,
                "trip_duration",
                data.meta_fields.trip_duration,
              )}
            </div>
          </p>
          <p className="text-blue-700">
            <span className="text-xl leading-tight">{"الدخول"}</span>
            <div className="text-2xl font-bold leading-tight">
              {getMetaFieldValueLabel(
                articleType,
                "entry_point",
                data.meta_fields.entry_point,
              )}
            </div>
          </p>
        </div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <div
            className={cn(
              "duration font-regular text-2xl",
              data.meta_fields.trip_type === "direct"
                ? "text-green-600"
                : "text-red-600",
            )}
          >
            <p className="d">
              رحلة{" "}
              {getMetaFieldValueLabel(
                articleType,
                "trip_type",
                data.meta_fields.trip_type,
              )}
            </p>
            <p className="d">
              {airelinesCompany?.meta_fields?.logo && (
                <Image
                  priority
                  className="object-cover"
                  src={serverSdk.storage.utils.getImageUrl(
                    airelinesCompany?.meta_fields?.logo.id,
                    {
                      width: 300,
                    },
                  )}
                  alt={airelinesCompany?.title || ""}
                  width={70}
                  height={50}
                />
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-between gap-4 rounded-b-xl bg-red2-50 px-6 py-4">
        <span className="text-2xl text-darkblue-600">{"ابتداء من"}</span>
        <span className="text-4xl font-bold text-beige-800">
          {formatAmount(data.meta_fields?.price, ",", 0)}
        </span>
      </div>
    </Link>
  );
};

export default PostCard_Server;
