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

export type OmrahPostCardProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response["edge"]>;
};

const OmrahPostCard: React.FC<OmrahPostCardProps> = ({ data, edge }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const articleType_slug = "trip";
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

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="relative rounded-xl bg-white pb-20 shadow-lg shadow-slate-200 transition-all hocus:z-10 hocus:-translate-y-2 hocus:scale-105 hocus:shadow-xl hocus:shadow-slate-200">
      <Link href={`/${data.slug}`}>
        <div className="relative h-40 w-full">
          <Image
            className="h-full w-full rounded-b-none rounded-t-xl object-cover"
            src={
              data.featured_image?.url ||
              "/assets/miqat/images/hajj-placeholder.jpg"
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
              dangerouslySetInnerHTML={{ __html: data.body_unformatted }}
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
                      width: 50,
                      height: 50,
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
  );
};

export default OmrahPostCard;
