import config from "@config/index";

export const isServer = () => typeof window === "undefined";

// eslint-disable-next-line unicorn/prevent-abbreviations
export const isDev = () => true && process.env.NODE_ENV !== "production";
