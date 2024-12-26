"use client";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const logger = initLogger(LoggerContext.FORM, "form");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Form;
import ApiAlias = Levelup.CMS.V1.Content.Api.Forms;

type FormListProps = {
};

const FormListFilter: React.FC<FormListProps> = ({  }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { t: tLabel } = useTranslation("label");
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

export default FormListFilter;
