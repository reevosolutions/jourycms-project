import Container, { Service } from "typedi";
import config from "../../config";
import { errorToObject } from "../../utilities/exceptions";
import {
  deepMergeUnlessNull,
  defaults,
} from "../../utilities/helpers/utils.helpers";
import initLogger, {
  LoggerContext,
  LoggerService,
} from "../../utilities/logging";
import { extractPartialObject } from "../../utilities/objects";
import exceptions from "../../exceptions";
import { isEntityObject } from "../../utilities/entities";
import CacheManager from "../cache-manager";
import { userMustBeLinkedToCompany } from "../../utilities/entities/auth.utilities";


@Service()
export default class SettingsManager {
  private logger: LoggerService;
  private cache: CacheManager;

  public constructor() {
    this.logger = initLogger(LoggerContext.SERVICE, this.constructor.name);
    this.cache = Container.get(CacheManager);
  }

  /**
   * Always set the company
   * @param params
   * @returns
   */
  public async getSettings<LoadFullResult extends boolean = false>(params: {
    app?: string | Levelup.V2.System.Entity.App;
    company?: string | Levelup.V2.Accounts.Entity.Company;
    store?: string | Levelup.V2.Accounts.Entity.Store;
    user?: string | Levelup.V2.Users.Entity.User;
    loadFullResult?: LoadFullResult;
  }): Promise<
    LoadFullResult extends true
      ? Levelup.V2.Accounts.Entity.AccountConfiguration
      : Levelup.V2.Accounts.Entity.AccountConfiguration["merged"]
  > {
    try {
      if (!params.app && !params.company && !params.store && !params.user) {
        throw new exceptions.ValidationException(
          "At least one of the following parameters must be provided: app, company, store or user"
        );
      }
      const { key, id, company } = this._getSettingsKeys(params);
      const cachedSettings =
        await this.cache.getForeign<Levelup.V2.Accounts.Entity.AccountConfiguration>(
          key,
          id,
          {
            company: isEntityObject(company) ? company._id : company,
          }
        );
      if (cachedSettings) {
        return params.loadFullResult
          ? cachedSettings
          : (cachedSettings.merged as any);
      }

      const settings: Levelup.V2.Accounts.Entity.AccountConfiguration =
        await this.generateSettings(params);

      this.logger.tree("Account settings", params, settings);
      if (settings.merged) {
        await this.cache.setForeign(key, id, settings, {
          company: isEntityObject(company) ? company._id : company,
        });
        return params.loadFullResult ? settings : (settings.merged as any);
      }

      if (settings.errors?.length) {
        for (let idx = 0; idx < (settings.errors || []).length; idx++) {
          const error = (settings.errors || [])[idx];
          this.logger.error(error.message, error);
        }
      }
    } catch (error) {
      this.logger.error(this.getSettings.name, errorToObject(error));
      throw error;
    }
  }

  private _getSettingsKeys(params: {
    app?: string | Levelup.V2.System.Entity.App;
    company?: string | Levelup.V2.Accounts.Entity.Company;
    store?: string | Levelup.V2.Accounts.Entity.Store;
    user?: string | Levelup.V2.Users.Entity.User;
  }): {
    key: string;
    id: string;
    company?: string | null;
  } {
    const result = {
      key: `accountSettings`,
      id: "",
      company: null,
    };

    const appId = isEntityObject(params.app) ? params.app._id : params.app;
    const companyId = isEntityObject(params.company)
      ? params.company._id
      : params.company;
    const storeId = isEntityObject(params.store)
      ? params.store._id
      : params.store;
    const userId = isEntityObject(params.user) ? params.user._id : params.user;

    if (userId) {
      result.key = `accountSettings:user`;
      result.id = userId;
    } else if (storeId) {
      result.key = `accountSettings:store`;
      result.id = storeId;
    } else if (companyId) {
      result.key = `accountSettings:company`;
      result.id = companyId;
    } else if (appId) {
      result.key = `accountSettings:app`;
      result.id = appId;
    }

    if (isEntityObject(params.user)) result.company = params.user.company;
    else if (isEntityObject(params.store))
      result.company = params.store.company;
    else if (isEntityObject(params.company))
      result.company = params.company._id;
    else if (params.company) result.company = params.company;

    return result;
  }

  private async generateSettings(params: {
    app?: string | Levelup.V2.System.Entity.App;
    company?: string | Levelup.V2.Accounts.Entity.Company;
    store?: string | Levelup.V2.Accounts.Entity.Store;
    user?: string | Levelup.V2.Users.Entity.User;
  }): Promise<Levelup.V2.Accounts.Entity.AccountConfiguration> {
    /**
     * Initialize the config object
     */
    const config: Levelup.V2.Accounts.Entity.AccountConfiguration = {
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

    const addError = (error: Error) => {
      config.errors.push(errorToObject(error));
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
          throw new exceptions.NotFoundException("User could not be loaded");
        else {
          if (user.company && !isEntityObject(company)) company = user.company;
          if (user.app && !isEntityObject(app)) app = user.app;
        }
      }

      /**
       * Get store from cache
       */

      if (store) {
        store =
          typeof store === "string"
            ? await this.cache.stores.get(store)
            : store;
        if (!store)
          throw new exceptions.NotFoundException("Store could not be loaded");
        else {
          if (store.company && !isEntityObject(company))
            company = store.company;
          if (store.app && !isEntityObject(app)) app = store.app;
        }
      }

      /**
       * Get company from cache
       */
      if (company) {
        company =
          typeof company === "string"
            ? await this.cache.companies.get(company)
            : company;
        if (!company)
          throw new exceptions.NotFoundException("Company could not be loaded");
        else {
          if (company.app && !isEntityObject(app)) app = company.app;
        }
      }

      /**
       * Get app from cache
       */
      if (app) {
        app = typeof app === "string" ? await this.cache.apps.get(app) : app;
        if (!app)
          throw new exceptions.NotFoundException("App could not be loaded");
      }

      const appObject = app as Levelup.V2.System.Entity.App;
      const companyObject = company as Levelup.V2.Accounts.Entity.Company;
      const storeObject = store as Levelup.V2.Accounts.Entity.Store;
      const userObject = user as Levelup.V2.Users.Entity.User;

      /**
       * Handle parent company and parent store
       */
      let parentCompany: Levelup.V2.Accounts.Entity.Company;

      if (companyObject?.attributes?.parent_company) {
        parentCompany = await this.cache.companies.get(
          companyObject?.attributes.parent_company
        );
        if (!parentCompany)
          throw new exceptions.NotFoundException(
            "Parent company could not be loaded"
          );
      }

      let parentStore: Levelup.V2.Accounts.Entity.Store;
      if (storeObject?.attributes?.parent_store) {
        parentStore = await this.cache.stores.get(
          storeObject?.attributes.parent_store
        );
        if (!parentStore)
          throw new exceptions.NotFoundException(
            "Parent store could not be loaded"
          );
      }

      /**
       * Set config attributes
       */
      config.app = { _id: appObject?._id, status: "active" };

      /* --------------------------------- app -------------------------------- */
      if (app) {
        config.app = { _id: appObject?._id, status: "active" };
        if (appObject?.attributes?.is_suspended)
          config.app.status = "suspended";
        if (appObject?.is_deleted) {
          config.app.deleted_since = appObject?.deleted_at;
          config.app.status = "deleted";
        }
      }

      /* --------------------------------- user -------------------------------- */
      if (user) {
        config.user = { _id: userObject?._id, status: "active" };
        if (!userObject?.attributes.is_active) {
          config.user.inactive_since = userObject?.attributes.inactive_since;
          config.user.status = "inactive";
        }
        if (userObject?.attributes?.is_active === false) {
          config.user.status = "inactive";
          config.user.inactive_since = userObject?.attributes.inactive_since;
        }
        if (!userObject?.attributes?.is_approved)
          config.user.status = "pending";
        if (userObject?.attributes?.is_suspended)
          config.user.status = "suspended";
        if (userObject?.is_deleted) {
          config.user.deleted_since = userObject?.deleted_at;
          config.user.status = "deleted";
        }
      }

      /* --------------------------------- company -------------------------------- */
      if (company) {
        config.company = { _id: companyObject?._id, status: "active" };
        if (!companyObject?.attributes.is_active) {
          config.company.inactive_since =
            companyObject?.attributes.inactive_since;
          config.company.status = "inactive";
        }
        if (companyObject?.attributes?.is_active === false) {
          config.company.status = "inactive";
          config.company.inactive_since =
            companyObject?.attributes.inactive_since;
        }
        if (!companyObject?.attributes?.is_approved)
          config.company.status = "pending";
        if (companyObject?.attributes?.is_suspended)
          config.company.status = "suspended";
        if (companyObject?.is_deleted) {
          config.company.deleted_since = companyObject?.deleted_at;
          config.company.status = "deleted";
        }
      }

      /* ---------------------------------- store --------------------------------- */
      if (store) {
        config.store = { _id: storeObject?._id, status: "active" };
        if (!storeObject?.attributes.is_active) {
          config.store.inactive_since = storeObject?.attributes.inactive_since;
          config.store.status = "inactive";
        }
        if (storeObject?.attributes?.is_active === false) {
          config.store.status = "inactive";
          config.store.inactive_since = storeObject?.attributes.inactive_since;
        }
        if (!storeObject?.attributes?.is_approved)
          config.store.status = "pending";
        if (storeObject?.attributes?.is_suspended)
          config.store.status = "suspended";
        if (storeObject?.is_deleted) {
          config.store.deleted_since = storeObject?.deleted_at;
          config.store.status = "deleted";
        }
      }

      /* ----------------------------- parent company ----------------------------- */
      if (parentCompany) {
        config.parent_company = { _id: parentCompany._id, status: "active" };
        if (!parentCompany.attributes.is_active) {
          config.parent_company.inactive_since =
            parentCompany.attributes.inactive_since;
          config.parent_company.status = "inactive";
        }
        if (parentCompany.attributes?.is_active === false) {
          config.parent_company.status = "inactive";
          config.parent_company.inactive_since =
            parentCompany.attributes.inactive_since;
        }
        if (!parentCompany.attributes?.is_approved)
          config.parent_company.status = "pending";
        if (parentCompany.attributes?.is_suspended)
          config.parent_company.status = "suspended";
        if (parentCompany.is_deleted) {
          config.parent_company.deleted_since = parentCompany.deleted_at;
          config.parent_company.status = "deleted";
        }
      }

      /* ------------------------------ parent store ------------------------------ */
      if (parentStore) {
        config.parent_store = { _id: parentStore._id, status: "active" };
        if (!parentStore.attributes.is_active) {
          config.parent_store.inactive_since =
            parentStore.attributes.inactive_since;
          config.parent_store.status = "inactive";
        }
        if (parentStore.attributes?.is_active === false) {
          config.parent_store.status = "inactive";
          config.parent_store.inactive_since =
            parentStore.attributes.inactive_since;
        }
        if (!parentStore.attributes?.is_approved)
          config.parent_store.status = "pending";
        if (parentStore.attributes?.is_suspended)
          config.parent_store.status = "suspended";
        if (parentStore.is_deleted) {
          config.parent_store.deleted_since = parentStore.deleted_at;
          config.parent_store.status = "deleted";
        }
      }

      if (
        config.app?.status === "deleted" ||
        config.user?.status === "deleted" ||
        config.company?.status === "deleted" ||
        config.store?.status === "deleted" ||
        config.parent_company?.status === "deleted" ||
        config.parent_store?.status === "deleted"
      ) {
        throw new exceptions.UnauthorizedException("Account is deleted");
      }

      if (
        config.app?.status === "suspended" ||
        config.user?.status === "suspended" ||
        config.company?.status === "suspended" ||
        config.store?.status === "suspended" ||
        config.parent_company?.status === "suspended" ||
        config.parent_store?.status === "suspended"
      ) {
        throw new exceptions.UnauthorizedException("Account is suspended");
      }

      if (
        config.user?.status === "pending" ||
        config.company?.status === "pending" ||
        config.store?.status === "pending" ||
        config.parent_company?.status === "pending" ||
        config.parent_store?.status === "pending"
      ) {
        throw new exceptions.UnauthorizedException(
          "Account is pending for approval"
        );
      }

      /**
       * Get the settings
       */
      if (!config.app?._id) delete config.app;
      if (!config.user?._id) delete config.user;
      if (!config.company?._id) delete config.company;
      if (!config.store?._id) delete config.store;
      if (!config.parent_company?._id) delete config.parent_company;
      if (!config.parent_store?._id) delete config.parent_store;

      // Get the company settings
      config.inherited_from_app = await this._buildAppSettings(appObject);
      config.inherited_from_parent_company = await this._buildCompanySettings(
        parentCompany
      );
      config.inherited_from_company = await this._buildCompanySettings(
        companyObject
      );
      config.inherited_from_parent_store = await this._buildStoreSettings(
        parentStore
      );
      config.inherited_from_store = await this._buildStoreSettings(storeObject);
      config.inherited_from_user = await this._buildUserSettings(userObject);

      config.merged = this._mergeSettings(
        config.inherited_from_app,
        config.inherited_from_parent_company,
        config.inherited_from_company,
        config.inherited_from_parent_store,
        config.inherited_from_store,
        config.inherited_from_user
      );

      // Check company / store linking
      if (userMustBeLinkedToCompany(userObject?.role_group) && !config.company)
        throw new exceptions.ValidationException(
          "No company linked to current user"
        );

      // Check the delivery zoning settings
      if (
        config.company?._id &&
        config.merged.services?.delivery?.is_enabled &&
        !config.merged.delivery_pricing_zones?.cities?.length
      ) {
        addError(
          new exceptions.ValidationException(
            "Delivery pricing city zones not configured for the current company"
          )
        );
      }
      if (
        config.company?._id &&
        config.merged.services?.delivery?.is_enabled &&
        !config.merged.delivery_pricing_zones?.states?.length
      ) {
        addError(
          new exceptions.ValidationException(
            "Delivery pricing state zones not configured for the current company"
          )
        );
      }

      if (
        config.company?._id &&
        config.merged.services?.delivery?.is_enabled &&
        !Object.keys(config.merged.delivery_pricing_zoning?.states || {}).length
      ) {
        addError(
          new exceptions.ValidationException(
            "Delivery pricing state pricing zoning not configured for the current company"
          )
        );
      }
      if (
        config.company?._id &&
        config.merged.services?.delivery?.is_enabled &&
        !Object.keys(config.merged.delivery_pricing_zoning?.cities || {}).length
      ) {
        addError(
          new exceptions.ValidationException(
            "Delivery pricing city pricing zoning not configured for the current company"
          )
        );
      }

      // Check the services
      if (
        !Object.values(config.merged.services || {}).reduce(
          (prev, curr) => prev || curr.is_enabled,
          false
        )
      ) {
        addError(
          new exceptions.ValidationException(
            "No services configured for the current account"
          )
        );
      }

      // Check the services settings
      Object.values(config.merged.services || {}).forEach((service) => {
        if (service.is_enabled && !service.settings) {
          addError(
            new exceptions.ValidationException(
              `Settings not configured for service ${service}`
            )
          );
        }
      });
    } catch (error) {
      this.logger.error(this.generateSettings.name, errorToObject(error));
      addError(error);
    }
    return config;
  }

  /**
   * @description Get the settings for the app
   */
  private async _buildAppSettings(
    app?: Levelup.V2.System.Entity.App
  ): Promise<Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>> {
    if (!app) throw new exceptions.ItemNotFoundException("App not loaded");
    const appSettings: any = app.settings || {};
    const settings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> =
      {
        ...appSettings,
        services: Object.keys(appSettings.services || {}).reduce(
          (prev, curr) => {
            prev[curr] = { is_enabled: appSettings.services[curr].is_enabled };
            return prev;
          },
          {}
        ),
      };
    return settings;
  }

  /**
   * @description Get the settings for the company
   */
  private async _buildCompanySettings(
    company?: Levelup.V2.Accounts.Entity.Company
  ): Promise<Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>> {
    if (!company) return undefined;

    const settings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> =
      {
        services: company.settings.services,
        // TODO Implement this
        // delivery_pricing_zoning: company.settings.delivery_pricing_zoning
      };

    const stateZones = await this.cache.spc.listStateZones({
      company: company._id,
    });
    const StateBasedZoning = await this.cache.spc.listStateBasedZonings({
      company: company._id,
    });
    const cityZones = await this.cache.spc.listCityZones({
      company: company._id,
    });
    const CityBasedZoning = await this.cache.spc.listCityBasedZonings({
      company: company._id,
    });
    settings.delivery_pricing_zones = {
      states:
        stateZones?.map((state) =>
          extractPartialObject(state, [
            "zone",
            "zone_name",
            "pricing",
            "express_delay",
            "economic_delay",
          ])
        ) || [],
      cities:
        cityZones?.map((city) =>
          extractPartialObject(city, [
            "zone",
            "zone_name",
            "pricing",
            "express_delay",
            "economic_delay",
            "min_distance_from_sorting_center",
            "max_distance_from_sorting_center",
          ])
        ) || [],
    };

    settings.delivery_pricing_zoning = {
      states: StateBasedZoning.reduce((prev, curr) => {
        prev[curr.state_code] = prev[curr.state_code] || {};
        curr.states.forEach((state) => {
          prev[curr.state_code][state.state_code] = state.zone;
        });
        return prev;
      }, {}),
      cities: CityBasedZoning.reduce((prev, curr) => {
        prev[curr.state_code] = prev[curr.state_code] || {};
        curr.cities.forEach((city) => {
          prev[curr.state_code][city.city_code] = city.zone;
        });
        return prev;
      }, {}),
    };

    return settings;
  }

  /**
   * @description Get the settings for the store
   */
  private async _buildStoreSettings(
    store?: Levelup.V2.Accounts.Entity.Store
  ): Promise<Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>> {
    if (!store) return undefined;

    /**
     * TODO: re-enable this on production
     */
    return undefined;
    const settings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> =
      {
        services: store.settings.services,
        // TODO Implement this
        // delivery_pricing_zoning: company.settings.delivery_pricing_zoning
      };
    return settings;
  }

  /**
   * @description Get the settings for the user
   */
  private async _buildUserSettings(
    user?: Levelup.V2.Users.Entity.User
  ): Promise<Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>> {
    if (!user) return undefined;
    const settings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> =
      {
        user_preferences: defaults(
          {
            ...(user.preferences || {}),
            ui_language:
              user.preferences?.ui_language ||
              config.settings.preferences.defaultLanguage,
          },
          {
            ui_language: config.settings.preferences.defaultLanguage,
            ui_mode: "os",
            printer_format: "A4",
          }
        ),
        // TODO Implement this
        // delivery_pricing_zoning: company.settings.delivery_pricing_zoning
      };
    return settings;
  }

  private _mergeSettings(
    ...args: (
      | Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>
      | undefined
    )[]
  ): Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> {
    const merged: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk> =
      {
        listing: {
          default_count: config.settings.listing.defaultCount,
        },
        locales: {
          default_language: config.settings.preferences.defaultLanguage,
          supported_languages: [config.settings.preferences.defaultLanguage],
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
      if (!settings) continue;

      // user preferences
      if (settings.user_preferences) {
        merged.user_preferences = merged.user_preferences || {
          ui_language: config.settings.preferences.defaultLanguage,
          ui_mode: "os",
          printer_format: "A4",
        };
        merged.user_preferences = deepMergeUnlessNull(
          merged.user_preferences || {},
          settings.user_preferences || {}
        );
      }

      // app settings
      if (settings.listing) {
        merged.listing.default_count =
          settings.listing.default_count || merged.listing.default_count;
        merged.locales.default_language =
          settings.locales.default_language || merged.locales.default_language;
        merged.locales.supported_languages = settings.locales
          .supported_languages?.length
          ? settings.locales.supported_languages
          : merged.locales.supported_languages;
        merged.locations.default_country =
          settings.locations.default_country ||
          merged.locations.default_country;
        merged.locations.supported_countries = settings.locations
          .supported_countries?.length
          ? settings.locations.supported_countries
          : merged.locations.supported_countries;
        merged.locations.default_currency =
          settings.locations.default_currency ||
          merged.locations.default_currency;
        merged.locations.supported_currencies = settings.locations
          .supported_currencies?.length
          ? settings.locations.supported_currencies
          : merged.locations.supported_currencies;
      }

      // services
      if (settings.services) {
        this.logger.tree("services", settings.services);
        merged.services = merged.services || {};
        Object.keys(settings.services).forEach((service) => {
          merged.services[service] = merged.services[service] || {
            is_enabled: true,
            settings: null,
          };
          merged.services[service].is_enabled =
            !!merged.services[service].is_enabled &&
            !!settings.services[service]?.is_enabled;
          if (!merged.services[service].is_enabled)
            merged.services[service].settings = null;
          else {
            const current_settings = settings.services[service].settings || {};
            /**
             * Ensure to not alter pricing by disabled custom pricing
             */
            if (!current_settings.has_custom_pricing)
              current_settings.pricing = null;

            merged.services[service].settings = deepMergeUnlessNull(
              merged.services[service].settings || {},
              current_settings
            );
          }
        });
      }

      // delivery_pricing_zoning
      if (settings.delivery_pricing_zoning) {
        merged.delivery_pricing_zoning = merged.delivery_pricing_zoning || {};
        merged.delivery_pricing_zoning = deepMergeUnlessNull(
          merged.delivery_pricing_zoning || {},
          settings.delivery_pricing_zoning || {}
        );
      }

      // delivery_pricing_zones
      if (settings.delivery_pricing_zones) {
        merged.delivery_pricing_zones = merged.delivery_pricing_zones || {};
        merged.delivery_pricing_zones = deepMergeUnlessNull(
          merged.delivery_pricing_zones || {},
          settings.delivery_pricing_zones || {}
        );
      }
    }

    if (!merged.services?.delivery.is_enabled) {
      delete merged.delivery_pricing_zones;
      delete merged.delivery_pricing_zoning;
    } else {
      if (!merged.delivery_pricing_zones) merged.delivery_pricing_zones = {};
      if (!merged.delivery_pricing_zones.states)
        merged.delivery_pricing_zones.states = [];
      if (!merged.delivery_pricing_zones.cities)
        merged.delivery_pricing_zones.cities = [];
      if (!merged.delivery_pricing_zoning) merged.delivery_pricing_zoning = {};
      if (!merged.delivery_pricing_zoning.states)
        merged.delivery_pricing_zoning.states = {};
      if (!merged.delivery_pricing_zoning.cities)
        merged.delivery_pricing_zoning.cities = {};

      if (!merged.services.delivery.settings)
        merged.services.delivery.settings = {} as any;
      if (!merged.services.delivery.settings.pricing)
        merged.services.delivery.settings.pricing = {} as any;
      if (!merged.services.delivery.settings.pricing.max_free_weight)
        merged.services.delivery.settings.pricing.max_free_weight =
          config.settings.defaultPricing.delivery.max_free_weight;
      if (!merged.services.delivery.settings.pricing.overweight_unit_price)
        merged.services.delivery.settings.pricing.overweight_unit_price =
          config.settings.defaultPricing.delivery.overweight_unit_price;
    }

    return merged;
  }

  public getDeliveryStateZone(
    accountSettings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>,
    starting_state_code: string,
    destination_state_code: string
  ) {
    const zoneNumber =
      accountSettings.delivery_pricing_zoning?.states?.[starting_state_code]?.[
        destination_state_code
      ] || 0;
    const zone = accountSettings.delivery_pricing_zones?.states?.find(
      (zone) => zone.zone === zoneNumber
    );
    if (!zone) return null;
    return zone;
  }
  public getDeliveryCityZone(
    accountSettings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>,
    destination_state_code: string,
    destination_city_code: string
  ) {
    const zoneNumber =
      accountSettings.delivery_pricing_zoning?.cities?.[
        destination_state_code
      ]?.[destination_city_code] || 0;
    const zone = accountSettings.delivery_pricing_zones?.cities?.find(
      (zone) => zone.zone === zoneNumber
    );
    if (!zone) return null;
    return zone;
  }

  public getDeliveryZones({
    accountSettings,
    starting_state_code,
    destination_state_code,
    destination_city_code,
  }: {
    accountSettings: Partial<Levelup.V2.Accounts.Entity.TAccountConfigurationChunk>;
    starting_state_code: string;
    destination_state_code: string;
    destination_city_code: string;
  }) {
    // state zone
    const stateZoneNumber =
      accountSettings.delivery_pricing_zoning?.states?.[starting_state_code]?.[
        destination_state_code
      ] || 0;
    const state_zone = accountSettings.delivery_pricing_zones?.states?.find(
      (zone) => zone.zone === stateZoneNumber
    );
    // city zone
    const cityZoneNumber =
      accountSettings.delivery_pricing_zoning?.cities?.[
        destination_state_code
      ]?.[destination_city_code] || 0;
    const city_zone = accountSettings.delivery_pricing_zones?.cities?.find(
      (zone) => zone.zone === cityZoneNumber
    );

    return {
      state_zone: state_zone || null,
      city_zone: city_zone || null,
    } as {
      state_zone: typeof state_zone | null;
      city_zone: typeof city_zone | null;
    };
  }
}
