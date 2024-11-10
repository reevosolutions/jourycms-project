"use client";

import useCache from "@hooks/use-cache";
import { AuthEntityDatum } from "@lib/cache-manager/adapters/dexie";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { type PromiseExtended } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import React, { useEffect, useState } from "react";

type Props = {};

const AuthenticationLoader: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const cache = useCache();

  const current = useLiveQuery(
    () => cache.db?.current.toArray() as PromiseExtended<AuthEntityDatum[]>,
  );

  useEffect(() => {
    if (current) {
      // dispatch(loadAuthData());
      // toast.info('Auth data updated');
    }
  }, [dispatch, current]);

  const authLoaded = useAppSelector(state => state.auth.status === "idle");
  const [, setState] = useState<"loading" | "show">("loading");

  useEffect(() => {
    if (!authLoaded) {
      setState("loading");
    } else {
      setState("show");
    }
  }, [authLoaded]);

  return null;
};

export default AuthenticationLoader;
