"use client";

import useCache from "@hooks/use-cache";
import { AuthEntityDatum } from "@lib/cache-manager/adapters/dexie";
import initLogger, { LoggerContext } from "@lib/logging";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { type PromiseExtended } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useCallback, useEffect, useState } from "react";

import { loadAuthenticationConfig } from "../redux/authentication.slice";
import { loadContentConfig } from "../redux/content.slice";

const logger = initLogger(LoggerContext.LOADER, "app-config");

type Props = {};

const AppConfigLoader: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const cache = useCache();

  const current = useLiveQuery(
    () =>
      cache.db?.current
        .where("entity")
        .equals("user")
        .toArray() as PromiseExtended<AuthEntityDatum[]>,
  );

  const loadAppConfig = useCallback(
    (forceLoadFormServer: boolean = false) => {
      dispatch(loadContentConfig(true));
      dispatch(loadAuthenticationConfig(forceLoadFormServer));
    },
    [dispatch],
  );

  useEffect(() => {
    const isUserAuthenticated = current && current.length > 0;
    let forceLoadFormServer = false;
    if (isUserAuthenticated) {
      forceLoadFormServer = true;
      logger.warn("App config data updated from server");
    } else {
      logger.success("App config data updated from local");
    }

    loadAppConfig(forceLoadFormServer);
  }, [current, loadAppConfig]);

  const loaded = useAppSelector(
    state => state.authentication.status === "idle",
  );
  const [, setState] = useState<"loading" | "show">("loading");

  useEffect(() => {
    if (!loaded) {
      setState("loading");
    } else {
      setState("show");
    }
  }, [loaded]);

  return null;
};

export default AppConfigLoader;
