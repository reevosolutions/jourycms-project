'use client';
import websiteConfig from "@/themes/miqat/config";
import AppConfigManager from "@lib/app-config-manager";
import initLogger, { LoggerContext } from "@lib/logging";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useCallback, useEffect, useMemo } from "react";

const logger = initLogger(LoggerContext.HOOK, "useCMSContent");

const useCMSContent = () => {
  const dispatch = useAppDispatch();

  const appConfigManager = useMemo(() => AppConfigManager.getInstance(), []);

  const articleTypes = useAppSelector((state) => state.content.articleTypes);


  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const getArticleTypes = useCallback(() => {
    return articleTypes
  }, [articleTypes]);

  const getArticleType = useCallback((_id: string) => {
    return articleTypes.find(item => item._id === _id) || null;
  }, [articleTypes]);
  const getArticleTypeBySlug = useCallback((slug: string) => {
    return articleTypes.find(item => item.slug === slug) || null;
  }, [articleTypes]);


  const getArticleTypeMetaFields = useCallback((_id: string) => {
    return articleTypes.find(item => item._id === _id)?.custom_meta_fields;
  }, [articleTypes]);


  const getMetaFieldLabel = useCallback((type_id: string, field_key: string) => {
    return articleTypes.find(item => item._id === type_id)?.custom_meta_fields?.find(item => item.field_key === field_key)?.field_label;
  }, [articleTypes]);

  const getMetaFieldValueLabel = useCallback((type_id: string, field_key: string, value: string) => {

    const field = articleTypes.find(item => item._id === type_id)?.custom_meta_fields?.find(item => item.field_key === field_key);
    logger.value('getMetaFieldValueLabel', { articleTypes, type_id, field_key, value, field });
    if (!field) return value;
    if (field.field_type === 'select' ||
      field.field_type === 'checkbox' ||
      field.field_type === 'radiobox'
    ) {
      return ((field as Levelup.CMS.V1.Content.CustomFields.MetaField<'select'>).field_options?.choices)?.find(item => item.value.toString() === value.toString())?.label || value;
    }
    return value;
  }, [articleTypes]);

  const getWebsiteConfig = useCallback(() => {
    return websiteConfig;
  }, []);

  const getWebsiteConfigValue = useCallback(<T = any>(key: keyof Levelup.CMS.V1.System.Entity.WebsiteConfig, defaultValue?: T): T => {
    const websiteConfig = getWebsiteConfig();
    return websiteConfig[key] as T;
  }, [getWebsiteConfig]);


  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (articleTypes.length === 0) {
      appConfigManager.getContentData();
    }
  }, [articleTypes])


  return {
    getArticleTypes,
    getArticleType,
    getArticleTypeBySlug,
    getArticleTypeMetaFields,
    getMetaFieldLabel,
    getMetaFieldValueLabel,
    getWebsiteConfigValue,
    getWebsiteConfig
  };
};

export default useCMSContent;
