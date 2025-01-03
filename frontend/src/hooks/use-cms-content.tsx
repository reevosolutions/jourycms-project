/* eslint-disable no-undef */
"use client";
import AppConfigManager from "@lib/app-config-manager";
import initLogger, {LoggerContext} from "@lib/logging";
import {useAppSelector} from "@redux/hooks";
import {useCallback, useEffect, useMemo} from "react";

import websiteConfig, {
  ArticleTypeSlug,
  TArticleTypeSlug,
} from "@/themes/miqat/config";
import {useSdk} from "./use-sdk";

const logger = initLogger(LoggerContext.HOOK, "useCMSContent");

const useCMSContent = () => {
  const sdk = useSdk();

  const appConfigManager = useMemo(() => AppConfigManager.getInstance(), []);

  const articleTypes = useAppSelector(state => state.content.articleTypes);

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const getArticleTypes = useCallback(() => {
    return articleTypes;
  }, [articleTypes]);

  const getArticleType = useCallback(
    async (_id: string) => {
      return await appConfigManager.getArticleTypeById(_id);
    },
    [appConfigManager],
  );
  const getArticleTypeBySlug = useCallback(
    async (slug: TArticleTypeSlug) => {
      return await appConfigManager.getArticleTypeBySlug(slug);
    },
    [appConfigManager],
  );

  const getArticleTypeMetaFields = useCallback(
    (_id: string) => {
      return articleTypes.find(item => item._id === _id)?.custom_meta_fields;
    },
    [articleTypes],
  );

  const getMetaFieldLabel = useCallback(
    (type_id: string, field_key: string) => {
      return articleTypes
        .find(item => item._id === type_id)
        ?.custom_meta_fields?.find(item => item.field_key === field_key)
        ?.field_label;
    },
    [articleTypes],
  );

  const getMetaFieldValueLabel = useCallback(
    (type_id: string, field_key: string, value: string) => {
      const field = articleTypes
        .find(item => item._id === type_id)
        ?.custom_meta_fields?.find(item => item.field_key === field_key);
      // logger.value("getMetaFieldValueLabel", {
      //   articleTypes,
      //   type_id,
      //   field_key,
      //   value,
      //   field,
      // });
      if (!field) return value;
      if (
        field.field_type === "select" ||
        field.field_type === "checkbox" ||
        field.field_type === "radiobox"
      ) {
        return (
          (
            field as Levelup.CMS.V1.Content.CustomFields.MetaField<"select">
          ).field_options?.choices?.find(
            item => item?.value?.toString() === value?.toString(),
          )?.label || value
        );
      }
      return value;
    },
    [articleTypes],
  );

  const getWebsiteConfig = useCallback(() => {
    return websiteConfig;
  }, []);

  const getWebsiteConfigValue = useCallback(
    <K extends keyof Levelup.CMS.V1.System.Entity.WebsiteConfig>(
      key: K,
      defaultValue?: Levelup.CMS.V1.System.Entity.WebsiteConfig[K],
    ) => {
      const websiteConfig = getWebsiteConfig();
      return (
        (websiteConfig[key] as Levelup.CMS.V1.System.Entity.WebsiteConfig[K]) ||
        defaultValue
      );
    },
    [getWebsiteConfig],
  );

  const getUserAgency = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        filters: {
          article_type: "agency",
          created_by: userID,
        },
      });
      if (data?.length) return data[0];
    },
    [sdk.content.articles],
  );

  const getDoctorProfileId = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        fields: ["_id"],
        filters: {
          article_type: "doctor",
          created_by: userID,
        },
      });
      if (data?.length) return data[0]._id;
    },
    [sdk.content.articles],
  );

  const getEscortProfileId = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        fields: ["_id"],
        filters: {
          article_type: "escort",
          created_by: userID,
        },
      });
      if (data?.length) return data[0]._id;
    },
    [sdk.content.articles],
  );
  const getUserAgencyId = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        fields: ["_id"],
        filters: {
          article_type: "agency",
          created_by: userID,
        },
      });
      if (data?.length) return data[0]?._id;
    },
    [sdk.content.articles],
  );

  const getDoctorProfile = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        filters: {
          article_type: "doctor",
          created_by: userID,
        },
      });
      if (data?.length) return data[0];
    },
    [sdk.content.articles],
  );

  const getEscortProfile = useCallback(
    async (userID: string) => {
      const {data} = await sdk.content.articles.list({
        count: 1,
        filters: {
          article_type: "escort",
          created_by: userID,
        },
      });
      if (data?.length) return data[0];
    },
    [sdk.content.articles],
  );

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (articleTypes.length === 0) {
      appConfigManager.getContentData();
    }
  }, [appConfigManager, articleTypes]);

  return {
    getArticleTypes,
    getArticleType,
    getArticleTypeBySlug,
    getArticleTypeMetaFields,
    getMetaFieldLabel,
    getMetaFieldValueLabel,
    getWebsiteConfigValue,
    getWebsiteConfig,
    getUserAgency,
    getDoctorProfile,
    getEscortProfile,
    getUserAgencyId,
    getDoctorProfileId,
    getEscortProfileId,
  };
};

export default useCMSContent;
