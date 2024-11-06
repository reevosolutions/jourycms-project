"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importStar(require("typedi"));
const base_service_1 = __importDefault(require("../../../common/base.service"));
const eventDispatcher_decorator_1 = require("../../../decorators/eventDispatcher.decorator");
const cache_manager_1 = __importDefault(require("../../../managers/cache-manager"));
const translation_tools_service_1 = __importDefault(require("./translation.tools.service"));
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
let BuilderService = class BuilderService extends base_service_1.default {
    constructor(eventDispatcher) {
        super();
        this.eventDispatcher = eventDispatcher;
    }
    /**
     * @description entry method
     */
    async run() {
        const scenario = this.initScenario(this.logger, this.seed);
        try {
            await this.seed();
            await this.cleanupData();
            await this.upgrade();
            await this.refreshCache();
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to test the update comparison
     */
    async seed() {
        const scenario = this.initScenario(this.logger, this.seed);
        try {
            const translationToolsService = typedi_1.default.get(translation_tools_service_1.default);
            await translationToolsService.translateUsingGoogleAPI();
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to clean up data
     */
    async cleanupData() {
        const scenario = this.initScenario(this.logger, this.cleanupData);
        try {
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to upgrade the service and refactor the database
     */
    async upgrade() {
        const scenario = this.initScenario(this.logger, this.upgrade);
        try {
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to refresh the cache
     */
    async refreshCache() {
        const scenario = this.initScenario(this.logger, this.refreshCache);
        try {
            const cache = typedi_1.default.get(cache_manager_1.default);
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
BuilderService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, eventDispatcher_decorator_1.EventDispatcher)()),
    __metadata("design:paramtypes", [Object])
], BuilderService);
exports.default = BuilderService;
//# sourceMappingURL=builder.service.js.map