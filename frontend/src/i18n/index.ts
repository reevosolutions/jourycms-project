/* eslint-disable no-unused-vars */
/**
 * @link https://blog.stackademic.com/easy-way-to-add-translation-in-next-js-13-app-router-using-i18next-13b0663979c0
 * FIXME: The UI will not be translated on Dev Turbo mode
 */

import i18nConfig from "@config/i18n.config";
import config from "@config/index";
import initLogger from "@lib/logging";
import axios from "axios";
import { createInstance, type i18n, type Resource } from "i18next";
import { type HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

const logger = initLogger("APPLICATION", "i18n");

const ITEMS_SENT_BACKEND: {
  [key: string]: true;
} = {};

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource,
) {
  logger.value("LOCALE", locale);

  i18nInstance =
    i18nInstance ||
    createInstance({
      debug: true,
    });

  i18nInstance.use(initReactI18next);

  if (!resources) {
    // i18nInstance.use(resourcesToBackend((language: string, namespace: string) => import(`../../locales/${language}/${namespace}.json`)));
  }

  await i18nInstance.init<HttpBackendOptions>({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
      // allowMultiLoading: true,
    },
    saveMissing: true,
    updateMissing: true,
    missingKeyHandler: (
      lngs: readonly string[],
      ns: string,
      key: string,
      fallbackValue: string,
      _updateMissing: boolean,
      options: any,
    ) => {

      // logger.warn("i18n MISSING KEY", { lngs, ns, key, fallbackValue, updateMissing, options, lang });

      try {
        if (false || !key) return;
        const hash = `levelup:${ns}:${key}`;
        if (ITEMS_SENT_BACKEND[hash]) return;
        // axios
        //   .post(
        //     `${config.sdk.baseURL}/cm/api/v2/translation/tools/missing-key`,
        //     {
        //       data: {
        //         project: "levelup",
        //         default_language: "en",
        //         languages: lngs,
        //         namespace: ns,
        //         key,
        //       },
        //     },
        //   )
        //   .then(response => {
        //     // logger.success("MISSING KEY", response.data);
        //     ITEMS_SENT_BACKEND[hash] = true;
        //   })
        //   .catch(error => { });
      } catch {
        logger.error("error");
      }
    },
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
