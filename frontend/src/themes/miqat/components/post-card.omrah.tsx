'use client';
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const logger = initLogger(LoggerContext.FORM, 'article');

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;

import Image from 'next/image';
import Link from 'next/link';
import { formatAmount } from "@/lib/utilities/strings";
import useCMSContent from "@/hooks/use-cms-content";

export type OmrahPostCardProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response['edge']>;
};


const OmrahPostCard: React.FC<OmrahPostCardProps> = ({ data, edge }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const articleType_slug = 'trip';
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  const { getMetaFieldLabel, getArticleType, getArticleTypeMetaFields, getArticleTypes, getMetaFieldValueLabel } = useCMSContent();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] = useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [agency, setAgency] = useState<Partial<EntityAlias> | null>(null)

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
    <div className="bg-white shadow-lg relative pb-20 shadow-slate-200 rounded-xl hocus:z-10 hocus:scale-105 hocus:-translate-y-2 hocus:shadow-xl hocus:shadow-slate-200 transition-all">
      <Link href={`/${data.slug}`}>
        <div className="relative h-40 w-full">
          <Image className="object-cover w-full h-full rounded-t-xl rounded-b-none" src={data.featured_image?.url || '/assets/miqat/images/hajj-placeholder.jpg'} alt={data.title} width={600} height={300} />
        </div>

        <div className="px-6 py-4">
          <div className="pb-0">
            <h3 className="text-3xl text-darkblue-900 font-semibold">
              {data.title}
            </h3>
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: data.body_unformatted }} />
          </div>

          {agency && (

            <div className="flex items-center gap-3 my-2">
              {agency.meta_fields?.logo && (
                <Image 
                  className="rounded-full w-8 h-8  shadow-md shadow-slate-200 border border-slate-100"
                src={sdk.storage.utils.getImageUrl(agency.meta_fields.logo.id, {
                  width: 50,
                  height: 50,
                })} width={50} height={50} alt={agency.title || ''} />
              )}
              <div className="flex-flex-col">
                <span className=" text-xl text-darkblue-600">{agency.title}</span>
              </div>
            </div>
          )}

          <p className="duration text-teal-600 font-bold text-2xl mb-2">
            {getMetaFieldValueLabel(
              data.article_type,
              'trip_duration',
              data.meta_fields.trip_duration
            )}
          </p>
        </div>
        <div className="bg-red2-50 px-6 py-4 flex justify-between gap-4 items-center  rounded-b-xl  absolute bottom-0 right-0 left-0 w-full">
          <span className="text-darkblue-600">
            {'ابتداء من'}
          </span>
          <span className="text-beige-800 font-bold text-4xl">
            {formatAmount(data.meta_fields?.price, ',', 0)} دج
          </span>

        </div>
      </Link>
    </div>
  );
}

export default OmrahPostCard; 