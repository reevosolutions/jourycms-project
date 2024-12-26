"use client";

import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const logger = initLogger(LoggerContext.FORM, "formEntry");

import EntityAlias = Levelup.CMS.V1.Content.Entity.FormEntry;
import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;

type FormEntryListProps = {
  form_id?: string;
};

const FormEntryListFilter: React.FC<FormEntryListProps> = ({form_id}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {}, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {}, []);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return <div className="form-group upcms-form"></div>;
};

export default FormEntryListFilter;
