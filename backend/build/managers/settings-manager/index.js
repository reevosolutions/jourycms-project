"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importStar(require("typedi"));
const config_1 = __importDefault(require("../../config"));
const exceptions_1 = require("../../utilities/exceptions");
const utils_helpers_1 = require("../../utilities/helpers/utils.helpers");
const logging_1 = __importStar(require("../../utilities/logging"));
const exceptions_2 = __importDefault(require("../../exceptions"));
const entities_1 = require("../../utilities/entities");
const cache_manager_1 = __importDefault(require("../cache-manager"));
const auth_utilities_1 = require("../../utilities/entities/auth.utilities");
let SettingsManager = class SettingsManager {
    constructor() {
        this.logger = (0, logging_1.default)(logging_1.LoggerContext.SERVICE, this.constructor.name);
        this.cache = typedi_1.default.get(cache_manager_1.default);
    }
    /**
     * Always set the company
     * @param params
     * @returns
     */
    async getSettings(params) {
        var _a;
        try {
            if (!params.app && !params.company && !params.store && !params.user) {
                throw new exceptions_2.default.ValidationException("At least one of the following parameters must be provided: app, company, store or user");
            }
            const { key, id, company } = this._getSettingsKeys(params);
            const cachedSettings = await this.cache.getForeign(key, id, {
                company: (0, entities_1.isEntityObject)(company) ? company._id : company,
            });
            if (cachedSettings) {
                return params.loadFullResult
                    ? cachedSettings
                    : cachedSettings.merged;
            }
            const settings = await this.generateSettings(params);
            this.logger.tree("Account settings", params, settings);
            if (settings.merged) {
                await this.cache.setForeign(key, id, settings, {
                    company: (0, entities_1.isEntityObject)(company) ? company._id : company,
                });
                return params.loadFullResult ? settings : settings.merged;
            }
            if ((_a = settings.errors) === null || _a === void 0 ? void 0 : _a.length) {
                for (let idx = 0; idx < (settings.errors || []).length; idx++) {
                    const error = (settings.errors || [])[idx];
                    this.logger.error(error.message, error);
                }
            }
        }
        catch (error) {
            this.logger.error(this.getSettings.name, (0, exceptions_1.errorToObject)(error));
            throw error;
        }
    }
    _getSettingsKeys(params) {
        const result = {
            key: `accountSettings`,
            id: "",
            company: null,
        };
        const appId = (0, entities_1.isEntityObject)(params.app) ? params.app._id : params.app;
        const companyId = (0, entities_1.isEntityObject)(params.company)
            ? params.company._id
            : params.company;
        const storeId = (0, entities_1.isEntityObject)(params.store)
            ? params.store._id
            : params.store;
        const userId = (0, entities_1.isEntityObject)(params.user) ? params.user._id : params.user;
        if (userId) {
            result.key = `accountSettings:user`;
            result.id = userId;
        }
        else if (storeId) {
            result.key = `accountSettings:store`;
            result.id = storeId;
        }
        else if (companyId) {
            result.key = `accountSettings:company`;
            result.id = companyId;
        }
        else if (appId) {
            result.key = `accountSettings:app`;
            result.id = appId;
        }
        if ((0, entities_1.isEntityObject)(params.user))
            result.company = params.user.company;
        else if ((0, entities_1.isEntityObject)(params.store))
            result.company = params.store.company;
        else if ((0, entities_1.isEntityObject)(params.company))
            result.company = params.company._id;
        else if (params.company)
            result.company = params.company;
        return result;
    }
    async generateSettings(params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26;
        /**
         * Initialize the config object
         */
        const config = {
            app: undefined,
            parent_company: undefined,
            company: undefined,
            parent_store: undefined,
            store: undefined,
            user: undefined,
            //
            inherited_from_app: undefined,
            inherited_from_parent_company: undefined,
            inherited_from_company: undefined,
            inherited_from_parent_store: undefined,
            inherited_from_store: undefined,
            inherited_from_user: undefined,
            merged: undefined,
            errors: [],
        };
        const addError = (error) => {
            config.errors.push((0, exceptions_1.errorToObject)(error));
        };
        try {
            let { app, company, store, user } = params;
            /**
             * Get user from cache
             */
            if (user) {
                user =
                    typeof user === "string" ? await this.cache.users.get(user) : user;
                if (!user)
                    throw new exceptions_2.default.NotFoundException("User could not be loaded");
                else {
                    if (user.company && !(0, entities_1.isEntityObject)(company))
                        company = user.company;
                    if (user.app && !(0, entities_1.isEntityObject)(app))
                        app = user.app;
                }
            }
            /**
             * Get app from cache
             */
            if (app) {
                app = typeof app === "string" ? await this.cache.apps.get(app) : app;
                if (!app)
                    throw new exceptions_2.default.NotFoundException("App could not be loaded");
            }
            const appObject = app;
            const companyObject = company;
            const storeObject = store;
            const userObject = user;
            /**
             * Set config attributes
             */
            config.app = { _id: appObject === null || appObject === void 0 ? void 0 : appObject._id, status: "active" };
            /* --------------------------------- app -------------------------------- */
            if (app) {
                config.app = { _id: appObject === null || appObject === void 0 ? void 0 : appObject._id, status: "active" };
                if ((_a = appObject === null || appObject === void 0 ? void 0 : appObject.attributes) === null || _a === void 0 ? void 0 : _a.is_suspended)
                    config.app.status = "suspended";
                if (appObject === null || appObject === void 0 ? void 0 : appObject.is_deleted) {
                    config.app.deleted_since = appObject === null || appObject === void 0 ? void 0 : appObject.deleted_at;
                    config.app.status = "deleted";
                }
            }
            /* --------------------------------- user -------------------------------- */
            if (user) {
                config.user = { _id: userObject === null || userObject === void 0 ? void 0 : userObject._id, status: "active" };
                if (!(userObject === null || userObject === void 0 ? void 0 : userObject.attributes.is_active)) {
                    config.user.inactive_since = userObject === null || userObject === void 0 ? void 0 : userObject.attributes.inactive_since;
                    config.user.status = "inactive";
                }
                if (((_b = userObject === null || userObject === void 0 ? void 0 : userObject.attributes) === null || _b === void 0 ? void 0 : _b.is_active) === false) {
                    config.user.status = "inactive";
                    config.user.inactive_since = userObject === null || userObject === void 0 ? void 0 : userObject.attributes.inactive_since;
                }
                if (!((_c = userObject === null || userObject === void 0 ? void 0 : userObject.attributes) === null || _c === void 0 ? void 0 : _c.is_approved))
                    config.user.status = "pending";
                if ((_d = userObject === null || userObject === void 0 ? void 0 : userObject.attributes) === null || _d === void 0 ? void 0 : _d.is_suspended)
                    config.user.status = "suspended";
                if (userObject === null || userObject === void 0 ? void 0 : userObject.is_deleted) {
                    config.user.deleted_since = userObject === null || userObject === void 0 ? void 0 : userObject.deleted_at;
                    config.user.status = "deleted";
                }
            }
            /* --------------------------------- company -------------------------------- */
            if (company) {
                config.company = { _id: companyObject === null || companyObject === void 0 ? void 0 : companyObject._id, status: "active" };
                if (!(companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes.is_active)) {
                    config.company.inactive_since =
                        companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes.inactive_since;
                    config.company.status = "inactive";
                }
                if (((_e = companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes) === null || _e === void 0 ? void 0 : _e.is_active) === false) {
                    config.company.status = "inactive";
                    config.company.inactive_since =
                        companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes.inactive_since;
                }
                if (!((_f = companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes) === null || _f === void 0 ? void 0 : _f.is_approved))
                    config.company.status = "pending";
                if ((_g = companyObject === null || companyObject === void 0 ? void 0 : companyObject.attributes) === null || _g === void 0 ? void 0 : _g.is_suspended)
                    config.company.status = "suspended";
                if (companyObject === null || companyObject === void 0 ? void 0 : companyObject.is_deleted) {
                    config.company.deleted_since = companyObject === null || companyObject === void 0 ? void 0 : companyObject.deleted_at;
                    config.company.status = "deleted";
                }
            }
            /* ---------------------------------- store --------------------------------- */
            if (store) {
                config.store = { _id: storeObject === null || storeObject === void 0 ? void 0 : storeObject._id, status: "active" };
                if (!(storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes.is_active)) {
                    config.store.inactive_since = storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes.inactive_since;
                    config.store.status = "inactive";
                }
                if (((_h = storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes) === null || _h === void 0 ? void 0 : _h.is_active) === false) {
                    config.store.status = "inactive";
                    config.store.inactive_since = storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes.inactive_since;
                }
                if (!((_j = storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes) === null || _j === void 0 ? void 0 : _j.is_approved))
                    config.store.status = "pending";
                if ((_k = storeObject === null || storeObject === void 0 ? void 0 : storeObject.attributes) === null || _k === void 0 ? void 0 : _k.is_suspended)
                    config.store.status = "suspended";
                if (storeObject === null || storeObject === void 0 ? void 0 : storeObject.is_deleted) {
                    config.store.deleted_since = storeObject === null || storeObject === void 0 ? void 0 : storeObject.deleted_at;
                    config.store.status = "deleted";
                }
            }
            /* ----------------------------- parent company ----------------------------- */
            if (((_l = config.app) === null || _l === void 0 ? void 0 : _l.status) === "deleted" ||
                ((_m = config.user) === null || _m === void 0 ? void 0 : _m.status) === "deleted" ||
                ((_o = config.company) === null || _o === void 0 ? void 0 : _o.status) === "deleted" ||
                ((_p = config.store) === null || _p === void 0 ? void 0 : _p.status) === "deleted" ||
                ((_q = config.parent_company) === null || _q === void 0 ? void 0 : _q.status) === "deleted" ||
                ((_r = config.parent_store) === null || _r === void 0 ? void 0 : _r.status) === "deleted") {
                throw new exceptions_2.default.UnauthorizedException("Account is deleted");
            }
            if (((_s = config.app) === null || _s === void 0 ? void 0 : _s.status) === "suspended" ||
                ((_t = config.user) === null || _t === void 0 ? void 0 : _t.status) === "suspended" ||
                ((_u = config.company) === null || _u === void 0 ? void 0 : _u.status) === "suspended" ||
                ((_v = config.store) === null || _v === void 0 ? void 0 : _v.status) === "suspended" ||
                ((_w = config.parent_company) === null || _w === void 0 ? void 0 : _w.status) === "suspended" ||
                ((_x = config.parent_store) === null || _x === void 0 ? void 0 : _x.status) === "suspended") {
                throw new exceptions_2.default.UnauthorizedException("Account is suspended");
            }
            if (((_y = config.user) === null || _y === void 0 ? void 0 : _y.status) === "pending" ||
                ((_z = config.company) === null || _z === void 0 ? void 0 : _z.status) === "pending" ||
                ((_0 = config.store) === null || _0 === void 0 ? void 0 : _0.status) === "pending" ||
                ((_1 = config.parent_company) === null || _1 === void 0 ? void 0 : _1.status) === "pending" ||
                ((_2 = config.parent_store) === null || _2 === void 0 ? void 0 : _2.status) === "pending") {
                throw new exceptions_2.default.UnauthorizedException("Account is pending for approval");
            }
            /**
             * Get the settings
             */
            if (!((_3 = config.app) === null || _3 === void 0 ? void 0 : _3._id))
                delete config.app;
            if (!((_4 = config.user) === null || _4 === void 0 ? void 0 : _4._id))
                delete config.user;
            if (!((_5 = config.company) === null || _5 === void 0 ? void 0 : _5._id))
                delete config.company;
            if (!((_6 = config.store) === null || _6 === void 0 ? void 0 : _6._id))
                delete config.store;
            if (!((_7 = config.parent_company) === null || _7 === void 0 ? void 0 : _7._id))
                delete config.parent_company;
            if (!((_8 = config.parent_store) === null || _8 === void 0 ? void 0 : _8._id))
                delete config.parent_store;
            // Get the company settings
            config.inherited_from_app = await this._buildAppSettings(appObject);
            config.inherited_from_user = await this._buildUserSettings(userObject);
            config.merged = this._mergeSettings(config.inherited_from_app, config.inherited_from_parent_company, config.inherited_from_company, config.inherited_from_parent_store, config.inherited_from_store, config.inherited_from_user);
            // Check company / store linking
            if ((0, auth_utilities_1.userMustBeLinkedToCompany)(userObject === null || userObject === void 0 ? void 0 : userObject.role_group) && !config.company)
                throw new exceptions_2.default.ValidationException("No company linked to current user");
            // Check the delivery zoning settings
            if (((_9 = config.company) === null || _9 === void 0 ? void 0 : _9._id) &&
                ((_11 = (_10 = config.merged.services) === null || _10 === void 0 ? void 0 : _10.delivery) === null || _11 === void 0 ? void 0 : _11.is_enabled) &&
                !((_13 = (_12 = config.merged.delivery_pricing_zones) === null || _12 === void 0 ? void 0 : _12.cities) === null || _13 === void 0 ? void 0 : _13.length)) {
                addError(new exceptions_2.default.ValidationException("Delivery pricing city zones not configured for the current company"));
            }
            if (((_14 = config.company) === null || _14 === void 0 ? void 0 : _14._id) &&
                ((_16 = (_15 = config.merged.services) === null || _15 === void 0 ? void 0 : _15.delivery) === null || _16 === void 0 ? void 0 : _16.is_enabled) &&
                !((_18 = (_17 = config.merged.delivery_pricing_zones) === null || _17 === void 0 ? void 0 : _17.states) === null || _18 === void 0 ? void 0 : _18.length)) {
                addError(new exceptions_2.default.ValidationException("Delivery pricing state zones not configured for the current company"));
            }
            if (((_19 = config.company) === null || _19 === void 0 ? void 0 : _19._id) &&
                ((_21 = (_20 = config.merged.services) === null || _20 === void 0 ? void 0 : _20.delivery) === null || _21 === void 0 ? void 0 : _21.is_enabled) &&
                !Object.keys(((_22 = config.merged.delivery_pricing_zoning) === null || _22 === void 0 ? void 0 : _22.states) || {}).length) {
                addError(new exceptions_2.default.ValidationException("Delivery pricing state pricing zoning not configured for the current company"));
            }
            if (((_23 = config.company) === null || _23 === void 0 ? void 0 : _23._id) &&
                ((_25 = (_24 = config.merged.services) === null || _24 === void 0 ? void 0 : _24.delivery) === null || _25 === void 0 ? void 0 : _25.is_enabled) &&
                !Object.keys(((_26 = config.merged.delivery_pricing_zoning) === null || _26 === void 0 ? void 0 : _26.cities) || {}).length) {
                addError(new exceptions_2.default.ValidationException("Delivery pricing city pricing zoning not configured for the current company"));
            }
            // Check the services
            if (!Object.values(config.merged.services || {}).reduce((prev, curr) => prev || curr.is_enabled, false)) {
                addError(new exceptions_2.default.ValidationException("No services configured for the current account"));
            }
            // Check the services settings
            Object.values(config.merged.services || {}).forEach((service) => {
                if (service.is_enabled && !service.settings) {
                    addError(new exceptions_2.default.ValidationException(`Settings not configured for service ${service}`));
                }
            });
        }
        catch (error) {
            this.logger.error(this.generateSettings.name, (0, exceptions_1.errorToObject)(error));
            addError(error);
        }
        return config;
    }
    /**
     * @description Get the settings for the app
     */
    async _buildAppSettings(app) {
        if (!app)
            throw new exceptions_2.default.ItemNotFoundException("App not loaded");
        const appSettings = app.settings || {};
        const settings = Object.assign(Object.assign({}, appSettings), { services: Object.keys(appSettings.services || {}).reduce((prev, curr) => {
                prev[curr] = { is_enabled: appSettings.services[curr].is_enabled };
                return prev;
            }, {}) });
        return settings;
    }
    /**
     * @description Get the settings for the user
     */
    async _buildUserSettings(user) {
        var _a;
        if (!user)
            return undefined;
        const settings = {
            user_preferences: (0, utils_helpers_1.defaults)(Object.assign(Object.assign({}, (user.preferences || {})), { ui_language: ((_a = user.preferences) === null || _a === void 0 ? void 0 : _a.ui_language) ||
                    config_1.default.settings.preferences.defaultLanguage }), {
                ui_language: config_1.default.settings.preferences.defaultLanguage,
                ui_mode: "os",
                printer_format: "A4",
            }),
            // TODO Implement this
            // delivery_pricing_zoning: company.settings.delivery_pricing_zoning
        };
        return settings;
    }
    _mergeSettings(...args) {
        var _a, _b, _c, _d;
        const merged = {
            listing: {
                default_count: config_1.default.settings.listing.defaultCount,
            },
            locales: {
                default_language: config_1.default.settings.preferences.defaultLanguage,
                supported_languages: [config_1.default.settings.preferences.defaultLanguage],
            },
            locations: {
                default_country: "DZ",
                supported_countries: ["DZ"],
                default_currency: "DA",
                supported_currencies: ["DA"],
            },
            services: {},
        };
        for (const settings of args) {
            if (!settings)
                continue;
            // user preferences
            if (settings.user_preferences) {
                merged.user_preferences = merged.user_preferences || {
                    ui_language: config_1.default.settings.preferences.defaultLanguage,
                    ui_mode: "os",
                    printer_format: "A4",
                };
                merged.user_preferences = (0, utils_helpers_1.deepMergeUnlessNull)(merged.user_preferences || {}, settings.user_preferences || {});
            }
            // app settings
            if (settings.listing) {
                merged.listing.default_count =
                    settings.listing.default_count || merged.listing.default_count;
                merged.locales.default_language =
                    settings.locales.default_language || merged.locales.default_language;
                merged.locales.supported_languages = ((_a = settings.locales
                    .supported_languages) === null || _a === void 0 ? void 0 : _a.length)
                    ? settings.locales.supported_languages
                    : merged.locales.supported_languages;
                merged.locations.default_country =
                    settings.locations.default_country ||
                        merged.locations.default_country;
                merged.locations.supported_countries = ((_b = settings.locations
                    .supported_countries) === null || _b === void 0 ? void 0 : _b.length)
                    ? settings.locations.supported_countries
                    : merged.locations.supported_countries;
                merged.locations.default_currency =
                    settings.locations.default_currency ||
                        merged.locations.default_currency;
                merged.locations.supported_currencies = ((_c = settings.locations
                    .supported_currencies) === null || _c === void 0 ? void 0 : _c.length)
                    ? settings.locations.supported_currencies
                    : merged.locations.supported_currencies;
            }
            // services
            if (settings.services) {
                this.logger.tree("services", settings.services);
                merged.services = merged.services || {};
                Object.keys(settings.services).forEach((service) => {
                    var _a;
                    merged.services[service] = merged.services[service] || {
                        is_enabled: true,
                        settings: null,
                    };
                    merged.services[service].is_enabled =
                        !!merged.services[service].is_enabled &&
                            !!((_a = settings.services[service]) === null || _a === void 0 ? void 0 : _a.is_enabled);
                    if (!merged.services[service].is_enabled)
                        merged.services[service].settings = null;
                    else {
                        const current_settings = settings.services[service].settings || {};
                        /**
                         * Ensure to not alter pricing by disabled custom pricing
                         */
                        if (!current_settings.has_custom_pricing)
                            current_settings.pricing = null;
                        merged.services[service].settings = (0, utils_helpers_1.deepMergeUnlessNull)(merged.services[service].settings || {}, current_settings);
                    }
                });
            }
            // delivery_pricing_zoning
            if (settings.delivery_pricing_zoning) {
                merged.delivery_pricing_zoning = merged.delivery_pricing_zoning || {};
                merged.delivery_pricing_zoning = (0, utils_helpers_1.deepMergeUnlessNull)(merged.delivery_pricing_zoning || {}, settings.delivery_pricing_zoning || {});
            }
            // delivery_pricing_zones
            if (settings.delivery_pricing_zones) {
                merged.delivery_pricing_zones = merged.delivery_pricing_zones || {};
                merged.delivery_pricing_zones = (0, utils_helpers_1.deepMergeUnlessNull)(merged.delivery_pricing_zones || {}, settings.delivery_pricing_zones || {});
            }
        }
        if (!((_d = merged.services) === null || _d === void 0 ? void 0 : _d.delivery.is_enabled)) {
            delete merged.delivery_pricing_zones;
            delete merged.delivery_pricing_zoning;
        }
        else {
            if (!merged.delivery_pricing_zones)
                merged.delivery_pricing_zones = {};
            if (!merged.delivery_pricing_zones.states)
                merged.delivery_pricing_zones.states = [];
            if (!merged.delivery_pricing_zones.cities)
                merged.delivery_pricing_zones.cities = [];
            if (!merged.delivery_pricing_zoning)
                merged.delivery_pricing_zoning = {};
            if (!merged.delivery_pricing_zoning.states)
                merged.delivery_pricing_zoning.states = {};
            if (!merged.delivery_pricing_zoning.cities)
                merged.delivery_pricing_zoning.cities = {};
            if (!merged.services.delivery.settings)
                merged.services.delivery.settings = {};
            if (!merged.services.delivery.settings.pricing)
                merged.services.delivery.settings.pricing = {};
            if (!merged.services.delivery.settings.pricing.max_free_weight)
                merged.services.delivery.settings.pricing.max_free_weight =
                    config_1.default.settings.defaultPricing.delivery.max_free_weight;
            if (!merged.services.delivery.settings.pricing.overweight_unit_price)
                merged.services.delivery.settings.pricing.overweight_unit_price =
                    config_1.default.settings.defaultPricing.delivery.overweight_unit_price;
        }
        return merged;
    }
    getDeliveryStateZone(accountSettings, starting_state_code, destination_state_code) {
        var _a, _b, _c, _d, _e;
        const zoneNumber = ((_c = (_b = (_a = accountSettings.delivery_pricing_zoning) === null || _a === void 0 ? void 0 : _a.states) === null || _b === void 0 ? void 0 : _b[starting_state_code]) === null || _c === void 0 ? void 0 : _c[destination_state_code]) || 0;
        const zone = (_e = (_d = accountSettings.delivery_pricing_zones) === null || _d === void 0 ? void 0 : _d.states) === null || _e === void 0 ? void 0 : _e.find((zone) => zone.zone === zoneNumber);
        if (!zone)
            return null;
        return zone;
    }
    getDeliveryCityZone(accountSettings, destination_state_code, destination_city_code) {
        var _a, _b, _c, _d, _e;
        const zoneNumber = ((_c = (_b = (_a = accountSettings.delivery_pricing_zoning) === null || _a === void 0 ? void 0 : _a.cities) === null || _b === void 0 ? void 0 : _b[destination_state_code]) === null || _c === void 0 ? void 0 : _c[destination_city_code]) || 0;
        const zone = (_e = (_d = accountSettings.delivery_pricing_zones) === null || _d === void 0 ? void 0 : _d.cities) === null || _e === void 0 ? void 0 : _e.find((zone) => zone.zone === zoneNumber);
        if (!zone)
            return null;
        return zone;
    }
    getDeliveryZones({ accountSettings, starting_state_code, destination_state_code, destination_city_code, }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // state zone
        const stateZoneNumber = ((_c = (_b = (_a = accountSettings.delivery_pricing_zoning) === null || _a === void 0 ? void 0 : _a.states) === null || _b === void 0 ? void 0 : _b[starting_state_code]) === null || _c === void 0 ? void 0 : _c[destination_state_code]) || 0;
        const state_zone = (_e = (_d = accountSettings.delivery_pricing_zones) === null || _d === void 0 ? void 0 : _d.states) === null || _e === void 0 ? void 0 : _e.find((zone) => zone.zone === stateZoneNumber);
        // city zone
        const cityZoneNumber = ((_h = (_g = (_f = accountSettings.delivery_pricing_zoning) === null || _f === void 0 ? void 0 : _f.cities) === null || _g === void 0 ? void 0 : _g[destination_state_code]) === null || _h === void 0 ? void 0 : _h[destination_city_code]) || 0;
        const city_zone = (_k = (_j = accountSettings.delivery_pricing_zones) === null || _j === void 0 ? void 0 : _j.cities) === null || _k === void 0 ? void 0 : _k.find((zone) => zone.zone === cityZoneNumber);
        return {
            state_zone: state_zone || null,
            city_zone: city_zone || null,
        };
    }
};
SettingsManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], SettingsManager);
exports.default = SettingsManager;
//# sourceMappingURL=index.js.map