import moment from "moment";
import initLogger, { LoggerService } from "../../../utilities/logging";
import { v4 as uuidv4 } from "uuid";
import Container from "typedi";
import CacheManager from "..";

export default class PdfPregenerationKeysCacheManager {
  private logger: LoggerService;
  private static instance: PdfPregenerationKeysCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = "pdfPreGenerationTokens";
  private readonly EXPIRATION = 3600 * 1;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): PdfPregenerationKeysCacheManager {
    if (!PdfPregenerationKeysCacheManager.instance) {
      PdfPregenerationKeysCacheManager.instance =
        new PdfPregenerationKeysCacheManager();
    }
    return PdfPregenerationKeysCacheManager.instance;
  }

  public async setToken(params: { [Key: string]: any }): Promise<string> {
    try {
      const now = new Date();
      const client = await this.cache.getClient();
      const token = `${now.getTime()}${uuidv4()}${uuidv4()}`.replace(/-/g, "");
      this.logger.event(this.setToken.name, `UPDATING ITEM ${token}`);
      await client.hSet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        token,
        JSON.stringify({
          params,
          last_updated: now,
        })
      );

      return token;
    } catch (e) {
      this.logger.error(this.setToken.name, e);
      throw e;
    }
  }

  public async getTokenParams(
    token: string
  ): Promise<{ [Key: string]: any } | null> {
    try {
      if (!token) return null;

      const client = await this.cache.getClient();
      const val = await client.hGet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        token
      );
      let oldDoc: {
        params: { [Key: string]: any };
        last_updated: Date;
      };
      if (val) {
        oldDoc = JSON.parse(val);
      }

      if (oldDoc) {
        if (this.cache.isExpired(oldDoc.last_updated, this.EXPIRATION)) {
          this.logger.warn(this.getTokenParams.name, `TOKEN EXPIRED ${token}`);
        }
        return oldDoc.params;
      } else
        this.logger.warn(this.getTokenParams.name, `TOKEN NOT FOUND ${token}`);

      return null;
    } catch (error) {
      this.logger.error(this.getTokenParams.name, error);
      return null;
    }
  }

  public async unsetToken(token: string): Promise<void> {
    const client = await this.cache.getClient();
    await client.hDel(this.CACHE_KEY, token);
  }
}
