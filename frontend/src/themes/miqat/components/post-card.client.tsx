"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;

import Image from "next/image";
import Link from "next/link";

import useCMSContent from "@/hooks/use-cms-content";
import { formatAmount } from "@/lib/utilities/strings";
import { animated, useSpring } from "@react-spring/web";
import { ArticleTypeSlug } from "../config";

export type PostCard_ClientProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response["edge"]>;
  articleTypeSlug: `${ArticleTypeSlug}`;
};

const PostCard_Client: React.FC<PostCard_ClientProps> = ({ data, edge, articleTypeSlug }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  const {
    getMetaFieldLabel,
    getArticleType,
    getArticleTypeMetaFields,
    getArticleTypes,
    getMetaFieldValueLabel,
  } = useCMSContent();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [agency, setAgency] = useState<Partial<EntityAlias> | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (data.meta_fields.agency) {
      const agency = edge?.linked_articles?.[data.meta_fields.agency] || null;
      setAgency(agency);
    }
  }, [data, edge]);

  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 180, friction: 12 },
  });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <animated.div style={styles}>
      <div className="relative rounded-xl bg-white pb-20 shadow-lg shadow-slate-200 transition-all hocus:z-10 hocus:-translate-y-2 hocus:scale-105 hocus:shadow-xl hocus:shadow-slate-200">
        <Link href={`/${data.slug}`}>
          <div className="relative h-40 w-full">
            <Image
              priority
              placeholder="blur"
              blurDataURL={
                data.featured_image?.id
                  ? sdk.storage.utils.getImageBlurredUrl(
                      data.featured_image?.id,
                    )
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAIAAABRDCAKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+UlEQVR4nAHuABH/ANXp8tfs99bu+s3q+8Lo+rbd7q3X6afc9J3Z847Q8HnF6gD1+//y+//p9v3m9//p///F09eqtLnP+P+44vOp2/OWz+4Aj5OYytDS8PX64+vxwszSgoKCfnp4scHJzPH+td3zp9HqADxAPFNWVZ2bloOEgIB4c4NyaHhsXYV+d6eho7K4vZudpAA6Kxg7LyFANy1URjtiUUdsVkpJOixrUUNqRTJuTDl6X0sAAAESBRMiGy1AKDhLQUZVPztIIBYcRz9DdmplkHpnf3RkADZLWDE9Q0ZSWkRQXlVgbG9zeIqFfaWejoqGeFlWTWNdVBZSgKQv2x7tAAAAAElFTkSuQmCC"
              }
              className="h-full w-full rounded-b-none rounded-t-xl object-cover"
              src={
                data.featured_image?.id
                  ? sdk.storage.utils.getImageUrl(data.featured_image?.id, {
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
            <div className="pb-0">
              <h3 className="text-3xl font-semibold text-darkblue-900">
                {data.title}
              </h3>
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{__html: data.body_unformatted || ''}}
              />
            </div>

            {agency && (
              <div className="my-2 flex items-center gap-3">
                {agency.meta_fields?.logo && (
                  <Image
                    className="h-8 w-8 rounded-full border border-slate-100 shadow-md shadow-slate-200"
                    src={sdk.storage.utils.getImageUrl(
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
                <div className="flex-flex-col">
                  <span className="text-xl text-darkblue-600">
                    {agency.title}
                  </span>
                </div>
              </div>
            )}

            <p className="duration mb-2 text-2xl font-bold text-teal-600">
              {getMetaFieldValueLabel(
                data.article_type,
                "trip_duration",
                data.meta_fields.trip_duration,
              )}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-between gap-4 rounded-b-xl bg-red2-50 px-6 py-4">
            <span className="text-darkblue-600">{"ابتداء من"}</span>
            <span className="text-4xl font-bold text-beige-800">
              {formatAmount(data.meta_fields?.price, ",", 0)} دج
            </span>
          </div>
        </Link>
      </div>
    </animated.div>
  );
};

export default PostCard_Client;
