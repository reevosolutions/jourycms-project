import { initSdkForLevelupClientApp } from "@hooks/use-sdk";
import AuthenticationManager from "@/features/auth/lib/authentication-manager";
import CacheManager from "@lib/cache-manager";
import initLogger, { LoggerService } from "@lib/logging";
import { applyOnChunkedArray } from "@lib/utilities/arrays";
import JouryCMSSdk from "jourycms-sdk";

export default class AppConfigManager {
  cache: CacheManager;
  sdk: JouryCMSSdk;
  static instance: AppConfigManager;
  logger: LoggerService;

  private _contentData: {
    loaded: boolean;
    articleTypes?: Levelup.CMS.V1.Content.Entity.ArticleType[];
    states?: {
      code: string;
      name: string;
    }[];
    cities?: {
      state_code: string;
      code: string;
      name: string;
    }[];
    lastUpdated?: Date;
  } = {
      loaded: false,
    };

  private _authenticationData: {
    loaded: boolean;
    lastUpdated?: Date;
    roles?: Levelup.CMS.V1.Auth.Entity.Role[] | undefined;
    permissions?: Levelup.CMS.V1.Auth.Entity.Permission[] | undefined;
  } = {
      loaded: false,
    };

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppConfigManager();
    }
    return this.instance;
  }

  private constructor() {
    this.logger = initLogger("UTILITY", this.constructor.name);

    /**
     * Init Cache Manager
     */
    this.cache = CacheManager.getInstance();

    /**
     * Init SDK
     */
    this.sdk = initSdkForLevelupClientApp();
  }

  private handleError(error: any) {
    this.logger.error("Application Config Manager Error", error);
  }


  /* -------------------------------------------------------------------------- */
  /*                            Authentication cache data                            */
  /* -------------------------------------------------------------------------- */
  async loadAuthenticationData(forceLoadFormServer = false) {
    try {
      this.logger.event("Loading Authentication Data", { forceLoadFormServer });

      if (this._authenticationData.loaded && !forceLoadFormServer) {
        this.logger.info("Authentication data already loaded");
        return;
      }

      // roles
      let roles = !forceLoadFormServer ? await this.cache.db?.roles.toArray() : [];
      if (roles?.length === 0) {
        this.logger.info("roles data not found in cache, fetching from server");
        roles = (
          await this.sdk.auth.roles.list({
            count: -1,
          })
        ).data;
        await applyOnChunkedArray(roles, 50, async (arr) => {
          await this.cache.db?.roles.bulkPut(arr || []);
        });
        this.logger.success("roles data loaded from server", roles?.length);
      }

      // permissions
      let permissions = !forceLoadFormServer ? await this.cache.db?.permissions.toArray() : [];
      if (permissions?.length === 0) {
        this.logger.info("permissions data not found in cache, fetching from server");
        permissions = (
          await this.sdk.auth.permissions.list({
            count: -1,
          })
        ).data;
        await applyOnChunkedArray(permissions, 50, async (arr) => {
          await this.cache.db?.permissions.bulkPut(arr || []);
        });
        this.logger.success("permissions data loaded from server", permissions?.length);
      }

      this.logger.info("Authentication data loaded from cache");

      this._authenticationData = {
        loaded: true,
        roles,
        permissions,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAuthenticationData(forceLoadFormServer = false) {
    const authManager = AuthenticationManager.getInstance();
    const isAuthenticated = await authManager.isAuthenticated;
    if (!isAuthenticated) return;
    await this.loadAuthenticationData(forceLoadFormServer);
    return this._authenticationData;
  }

  /**
   *
   * @param {boolean} forceLoadFormServer
   * @returns {void}
   */
  async loadApplicationConfig(forceLoadFormServer = false) {
    await this.loadAuthenticationData(forceLoadFormServer);
  }



  /* -------------------------------------------------------------------------- */
  /*                            Content cache data                            */
  /* -------------------------------------------------------------------------- */
  async loadContentData(forceLoadFormServer = false) {
    try {
      this.logger.event("Loading Content Data", { forceLoadFormServer });

      if (this._contentData.loaded && !forceLoadFormServer) {
        this.logger.info("Content data already loaded");
        return;
      }

      // articleTypes
      let articleTypes = !forceLoadFormServer ? await this.cache.db?.articleTypes.toArray() : [];
      if (articleTypes?.length === 0) {
        this.logger.info("articleTypes data not found in cache, fetching from server");
        articleTypes = (
          await this.sdk.content.articleTypes.list({
            count: -1,
          })
        ).data;

        await this.cache.db?.articleTypes.bulkPut((articleTypes || []).map((v) => ({ ...v })));
        this.logger.success("articleTypes data loaded from server", articleTypes?.length);
      }

      // states
      let states = !forceLoadFormServer ? await this.cache.db?.states.toArray() : [];
      if (states?.length === 0) {
        this.logger.info("States data not found in cache, fetching from server");

      }

      // cities
      let cities = !forceLoadFormServer ? await this.cache.db?.cities.toArray() : [];
      if (cities?.length === 0) {
        this.logger.info("Cities data not found in cache, fetching from server");

      }
      this.logger.info("Content data loaded from cache");

      this._contentData = {
        loaded: true,
        articleTypes,
        states,
        cities,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getContentData(forceLoadFormServer = false) {
    await this.loadContentData(forceLoadFormServer);
    return this._contentData;
  }
}
