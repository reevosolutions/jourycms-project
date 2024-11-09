import "../lib/utilities/extend-prototypes/string.prototype";

export { default as adminRoutes } from "./routes.admin.config";
export { default as appConfig } from "./app.config";

const config = {
  /**
   * Cache Manager Configuration
   */
  cacheManager: {
    dbName: process.env.NEXT_PUBLIC_CACHE_DB_NAME || "jourycms",
    dbVersion: parseInt(process.env.NEXT_PUBLIC_CACHE_DB_Version || "1") || 1,
  },

  /**
   * SDK Configuration
   */
  sdk: {
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_BASE_URL_DEV || "http://localhost:5500"
        : process.env.NEXT_PUBLIC_API_BASE_URL_PROD || "https://jourycms.com",
    appId: process.env.NEXT_PUBLIC_API_APP_ID || "",
    appSecret: process.env.NEXT_PUBLIC_API_APP_SECRET || "",
    debug: [true, 1, "1", "true"].includes(process.env.NEXT_PUBLIC_API_SDK_DEBUG || "true"),
  },

  /**
   * Security
   */
  security: {
    localStorage: {
      secret: process.env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET || "xAmR6cjH9UYHRdOymtSQPCiTOwjPV1tn",
      passphrase: process.env.NEXT_PUBLIC_LOCAL_STORAGE_PASSPHRASE || "dO7BBxWTh1fZM7BNccWsTdV2DYn2UAI8",
    },
  },

}


export default config;