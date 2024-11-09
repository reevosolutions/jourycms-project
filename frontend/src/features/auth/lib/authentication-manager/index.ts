import { initSdkForLevelupClientApp } from "@hooks/use-sdk";
import CacheManager from "@lib/cache-manager";
import EncryptionManager from "@lib/encryption-manager";
import initLogger, { LoggerService } from "@lib/logging";
import JouryCMSSdk from "jourycms-sdk";

export default class AuthenticationManager {
  cache: CacheManager;
  crypto: EncryptionManager;
  sdk: JouryCMSSdk;
  static instance: AuthenticationManager;
  logger: LoggerService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthenticationManager();
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
     * Init Encryption Manager
     */
    this.crypto = EncryptionManager.getInstance();

    /**
     * Init SDK
     */
    this.sdk = initSdkForLevelupClientApp();
  }

  async saveAccessToken(token: string) {
    const encryptedToken = await this.crypto.encrypt(token);
    window?.localStorage.setItem(
      "token",
      this.crypto.arrayBufferToBase64(encryptedToken),
    );
  }
  async loadAccessToken() {
    const encryptedToken = window?.localStorage.getItem("token") || null;
    if (!encryptedToken) return null;
    return this.crypto.decrypt(this.crypto.base64ToArrayBuffer(encryptedToken));
  }
  async saveRefreshToken(token: string) {
    const encryptedToken = await this.crypto.encrypt(token);
    window?.localStorage.setItem(
      "refresh.token",
      this.crypto.arrayBufferToBase64(encryptedToken),
    );
  }

  async loadRefreshToken() {
    const encryptedToken =
      window?.localStorage.getItem("refresh.token") || null;
    if (!encryptedToken) return null;
    return this.crypto.decrypt(this.crypto.base64ToArrayBuffer(encryptedToken));
  }

  async clearTokens() {
    window?.localStorage.removeItem("token");
    window?.localStorage.removeItem("refresh.token");
  }

  async authenticate({
    user,
    token,
    refresh_token,
  }: Levelup.CMS.V1.Utils.NonUndefined<
    Levelup.CMS.V1.Auth.Api.Auth.Signin.Response["data"]
  >) {
    let result: {
      isAuthenticated: boolean;
      user: Levelup.CMS.V1.Users.Entity.ExposedUser | null;
      app: Levelup.CMS.V1.System.Entity.App | null;
      status: "idle" | "failed";
    } = {
      isAuthenticated: false,
      user: null,
      app: null,
      status: "idle",
    };
    try {
      // token
      const old_token = await this.loadAccessToken();
      const old_refresh_token = await this.loadRefreshToken();
      this.logger.debug("_authenticate", "comparing tokens", {
        old_token,
        token,
        old_refresh_token,
        refresh_token,
      });

      await this.saveAccessToken(token);
      await this.saveRefreshToken(refresh_token);

      // user
      await this.cache.setCurrentAuthObject("user", user);
      // app
      if (user.app)
        result.app =
          ((await this.sdk.system.apps.getById("current"))
            .data as Levelup.CMS.V1.Utils.NonUndefined<typeof result.app>) ||
          null;
      if (result.app) await this.cache.setCurrentAuthObject("app", result.app);
      else this.cache.unsetCurrentAuthObject("app");

      result.user = user;
      result.isAuthenticated = true;
      result.status = "idle";
    } catch (error) {
      this.logger.error("_authenticate", "error", error);
      result.status = "failed";
    }

    return result;
  }

  get user(): Promise<Levelup.CMS.V1.Users.Entity.ExposedUser | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.cache.getCurrentAuthObject("user");
        resolve(user);
      } catch (error) {
        reject(null);
      }
    });
  }

  get isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.cache.getCurrentAuthObject("user");
        resolve(!!user);
      } catch (error) {
        reject(false);
      }
    });
  }

  async logout() {
    try {
      this.clearTokens();
      await this.cache.clearCurrentAuthData();
    } catch (error) {}
  }

  async getAuthData(): Promise<{
    isAuthenticated: boolean;
    user: Levelup.CMS.V1.Users.Entity.ExposedUser | null;
    app: Levelup.CMS.V1.System.Entity.App | null;
  }> {
    const user = await this.cache.getCurrentAuthObject("user");
    const app = await this.cache.getCurrentAuthObject("app");
    return {
      isAuthenticated: !!user,
      user,
      app,
    };
  }

  async updateCurrentUser(newUser: Levelup.CMS.V1.Users.Entity.ExposedUser) {
    const user = await this.cache.getCurrentAuthObject("user");
    if (!user) throw new Error("User not found");
    if (user._id !== newUser._id) throw new Error("Unauthorized");
    await this.cache.setCurrentAuthObject("user", newUser);
  }
}
