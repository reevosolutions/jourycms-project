import config from "@config/index";

export const isServer = () => typeof window === "undefined";

export const isDev = () => true && process.env.NODE_ENV !== "production";
