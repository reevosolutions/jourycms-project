import initLogger, { LoggerService } from "../../utilities/logging/index";
import Container, { Service } from "typedi";
import BaseService from "../../common/base.service";

const t: (namespace: string, str: string) => string = (namespace, key) => {
  return key;
};

@Service()
export default class TranslationManagerService extends BaseService {
  private static logger: LoggerService;

  public initialized: boolean = false;
  private constructor() {
    super();
  }

  public static async generateTranslationFunction() {
    return t;
  }
  public static async init(): Promise<any> {
    try {
      this.logger = initLogger("SERVICE", this.name);
      Container.set("t", await this.generateTranslationFunction());
    } catch (error) {
      this.logger.error(this.init.name, error);
    }
  }
}
