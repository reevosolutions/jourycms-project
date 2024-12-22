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

export type DefaultPostCard_ServerProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response["edge"]>;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
  absolute?: boolean;
};

const DefaultPostCard_Server: React.FC<DefaultPostCard_ServerProps> = ({
  data,
  edge,
  articleType,
  absolute,
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
      className={cn(
        "block rounded-xl bg-white shadow-lg shadow-slate-200 transition-all hocus:z-10 hocus:-translate-y-2 hocus:scale-105 hocus:shadow-xl hocus:shadow-slate-200",
        absolute && "absolute h-full",
        !absolute && "relative",
      )}
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
        <h2 className="flex items-center justify-between text-2xl font-semibold text-darkblue-900">
          <span className="">{data.title}</span>
        </h2>

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
              <span className="text-lg leading-none text-darkblue-600">
                {agency.title}
              </span>
            </div>
          </div>
        )}

        <div className="text-blue-700">
          <div className="text-xl font-bold leading-tight">
            {getMetaFieldValueLabel(
              articleType,
              "medina_mekkah",
              data.meta_fields.medina_mekkah,
            )}
          </div>
        </div>
        <div className="text-darkblue-600">
          <div className="text-xl font-bold leading-tight">
            {getMetaFieldValueLabel(
              articleType,
              "hotel_rating",
              data.meta_fields.hotel_rating,
            )}
          </div>
        </div>

        {data.body_unformatted && (
          <div
            className="my-4 text-sm text-gray-500"
            dangerouslySetInnerHTML={{__html: data.body_unformatted || ""}}
          />
        )}

      </div>
    </Link>
  );
};

export default DefaultPostCard_Server;
