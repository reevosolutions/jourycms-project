"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;


import useCMSContent from "@/hooks/use-cms-content";
import { animated, useSpring } from "@react-spring/web";
import { ArticleTypeSlug } from "../config";
import PostCard_Server from "./post-card.server";

export type PostCard_ClientProps = JouryCMS.Theme.ComponentProps & {
  data: EntityAlias;
  edge?: Partial<ApiAlias.List.Response["edge"]>;
  articleTypeSlug: `${ArticleTypeSlug}`;
};

const PostCard_Client: React.FC<PostCard_ClientProps> = ({
  data,
  edge,
  articleTypeSlug,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
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
    from: {opacity: 0, transform: "translateY(20px)"},
    to: {opacity: 1, transform: "translateY(0px)"},
    config: {tension: 180, friction: 12},
  });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <animated.div style={styles} className="relative">
      {edge?.article_types?.[data.article_type] && (

      <PostCard_Server
        data={data as any}
        articleType={edge?.article_types[data.article_type] as any}
        edge={edge}
      />
      )}
      
    </animated.div>
  );
};

export default PostCard_Client;
