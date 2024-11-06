"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRole = exports.DEFAULT_ROLES_LABELS = exports.ROLE_GROUP_LABELS = exports.RoleGroup = exports.DEFAULT_USER_ROLES = exports.ROLE_GROUP_ORDER = exports.SYSTEM_ROLE_GROUPS = exports.HIDDEN_ROLE_GROUPS = exports.ROLE_GROUPS = void 0;
exports.ROLE_GROUPS = [
    "master",
    "system_administrators",
    "application_account_owners",
    "application_administrators",
    "company_account_owners",
    "company_administrators",
    //
    "administrators",
    "agents",
    "deliverers",
    "sellers",
    //
    "users",
];
exports.HIDDEN_ROLE_GROUPS = [
    "master",
    "system_administrators",
    "application_account_owners",
    "application_administrators",
    "company_account_owners",
    "company_administrators",
];
exports.SYSTEM_ROLE_GROUPS = [
    "master",
    "system_administrators",
    "application_account_owners",
    "application_administrators",
    "company_account_owners",
    "company_administrators",
    "deliverers",
    "sellers",
];
// export const ROLE_GROUP_ORDER: { [Group in Levelup.V2.Auth.Entity.TRoleGroup]: number } = {
exports.ROLE_GROUP_ORDER = {
    master: 0,
    system_administrators: 10,
    application_account_owners: 20,
    application_administrators: 21,
    company_account_owners: 30,
    company_administrators: 31,
    //
    administrators: 50,
    agents: 51,
    deliverers: 60,
    sellers: 70,
    //
    users: 100,
};
exports.DEFAULT_USER_ROLES = {
    master: [
        {
            name: "master",
            description: "",
            hasAllPermissions: true,
        },
    ],
    system_administrators: [
        {
            name: "system administrator",
            description: "",
            hasAllPermissions: true,
        },
        {
            name: "system maintainer",
            description: "",
            hasAllPermissions: true,
        },
    ],
    application_account_owners: [
        {
            name: "application account owner",
            description: "",
            hasAllPermissions: true,
        },
    ],
    application_administrators: [
        {
            name: "application administrator",
            description: "",
            hasAllPermissions: true,
        },
    ],
    company_account_owners: [
        {
            name: "company account owner",
            description: "",
            hasAllPermissions: true,
        },
    ],
    company_administrators: [
        {
            name: "company administrator",
            description: "",
            hasAllPermissions: true,
        },
    ],
    administrators: [
        {
            name: "administrator",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "logistic manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "hub manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "agency manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "office supervisor",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "chief cashier",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "agency cashier",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "cashier",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "hub cashier",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "chief customer manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "customer manager central",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "customer manager",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "chief commercial",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "commercial central",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "commercial",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "warehouse manager",
            description: "",
            hasAllPermissions: false,
        },
    ],
    agents: [
        {
            name: "hub agent",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "agency agent",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "driver",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "warehouse agent",
            description: "",
            hasAllPermissions: false,
        },
    ],
    deliverers: [
        {
            name: "deliverer",
            hasAllPermissions: false,
            description: "",
        },
    ],
    sellers: [
        {
            name: "seller",
            description: "",
            hasAllPermissions: false,
        },
        {
            name: "store moderator",
            description: "",
            hasAllPermissions: false,
        },
    ],
    users: [
        {
            name: "user",
            description: "",
            hasAllPermissions: false,
        },
    ],
};
var RoleGroup;
(function (RoleGroup) {
    RoleGroup["Master"] = "master";
    RoleGroup["SystemAdministrators"] = "system_administrators";
    RoleGroup["ApplicationAccountOwners"] = "application_account_owners";
    RoleGroup["ApplicationAdministrators"] = "application_administrators";
    RoleGroup["CompanyAccountOwners"] = "company_account_owners";
    RoleGroup["CompanyAdministrators"] = "company_administrators";
    //
    RoleGroup["Administrators"] = "administrators";
    RoleGroup["Agents"] = "agents";
    RoleGroup["Deliverers"] = "deliverers";
    RoleGroup["Sellers"] = "sellers";
    /**
     * @description Users: default role group
     */
    RoleGroup["Users"] = "users";
})(RoleGroup || (exports.RoleGroup = RoleGroup = {}));
exports.ROLE_GROUP_LABELS = {
    master: "Master",
    system_administrators: "System Administrators",
    application_account_owners: "Application Account Owners",
    application_administrators: "Application Administrators",
    company_account_owners: "Company Account Owners",
    company_administrators: "Company Administrators",
    //
    administrators: "Administrators",
    agents: "Agents",
    deliverers: "Deliverers",
    sellers: "Sellers",
    /**
     * @description Users: default role group
     */
    users: "Users",
};
const DEFAULT_ROLES = [
    // master
    "master",
    // system_administrators
    "application administrator",
    // company_account_owners
    "company account owner",
    // company_administrators
    "company administrator",
    // administrators
    "office supervisor",
    "administrator",
    "manager",
    "logistic manager",
    "hub manager",
    "agency manager",
    // -
    "chief cashier",
    "agency cashier",
    "cashier",
    "hub cashier",
    // -
    "chief customer manager",
    "customer manager central",
    "customer manager",
    // -
    "chief commercial",
    "commercial central",
    "commercial",
    // agents
    "hub agent",
    "agency agent",
    "driver",
    // deliverers
    "deliverer",
    // sellers
    "seller",
    "store moderator",
    // users
    "user",
];
exports.DEFAULT_ROLES_LABELS = {
    // master
    master: "Master",
    "system administrator": "System Administrator",
    "system maintainer": "System Maintainer",
    // application_account_owners
    "application account owner": "Application Account Owner",
    // application_administrators
    "application administrator": "Application Administrator",
    // company_account_owners
    "company account owner": "Company Account Owner",
    // company_administrators
    "company administrator": "Company Administrator",
    // administrators
    "office supervisor": "Office Supervisor",
    administrator: "Administrator",
    manager: "Manager",
    "logistic manager": "Logistic Manager",
    "hub manager": "Hub Manager",
    "agency manager": "Agency Manager",
    // -
    "chief cashier": "Chief Cashier",
    "agency cashier": "Agency Cashier",
    cashier: "Cashier",
    "hub cashier": "Hub Cashier",
    // -
    "chief customer manager": "Chief Customer Manager",
    "customer manager central": "Customer Manager Central",
    "customer manager": "Customer Manager",
    // -
    "chief commercial": "Chief Commercial",
    "commercial central": "Commercial Central",
    commercial: "Commercial",
    // agents
    "hub agent": "Hub Agent",
    "agency agent": "Agency Agent",
    "warehouse manager": "Warehouse Manager",
    "warehouse agent": "Warehouse Agent",
    driver: "Driver",
    // deliverers
    deliverer: "Deliverer",
    // sellers
    seller: "Seller",
    "store moderator": "Store Moderator",
    // users
    user: "User",
};
var DefaultRole;
(function (DefaultRole) {
    DefaultRole["Master"] = "master";
    DefaultRole["SystemAdministrator"] = "system administrator";
    DefaultRole["SystemMaintainer"] = "system maintainer";
    DefaultRole["ApplicationAccountOwner"] = "application account owner";
    DefaultRole["ApplicationAdministrator"] = "application administrator";
    DefaultRole["CompanyAccountOwner"] = "company account owner";
    DefaultRole["CompanyAdministrator"] = "company administrator";
    DefaultRole["OfficeSupervisor"] = "office supervisor";
    DefaultRole["Administrator"] = "administrator";
    DefaultRole["Manager"] = "manager";
    DefaultRole["LogisticManager"] = "logistic manager";
    DefaultRole["HubManager"] = "hub manager";
    DefaultRole["AgencyManager"] = "agency manager";
    DefaultRole["ChiefCashier"] = "chief cashier";
    DefaultRole["AgencyCashier"] = "agency cashier";
    DefaultRole["Cashier"] = "cashier";
    DefaultRole["HubCashier"] = "hub cashier";
    DefaultRole["ChiefCustomerManager"] = "chief customer manager";
    DefaultRole["CustomerManagerCentral"] = "customer manager central";
    DefaultRole["CustomerManager"] = "customer manager";
    DefaultRole["ChiefCommercial"] = "chief commercial";
    DefaultRole["CommercialCentral"] = "commercial central";
    DefaultRole["Commercial"] = "commercial";
    DefaultRole["HubAgent"] = "hub agent";
    DefaultRole["AgencyAgent"] = "agency agent";
    DefaultRole["Driver"] = "driver";
    DefaultRole["Deliverer"] = "deliverer";
    DefaultRole["Seller"] = "seller";
    DefaultRole["StoreModerator"] = "store moderator";
    DefaultRole["User"] = "user";
    DefaultRole["WarehouseManager"] = "warehouse manager";
    DefaultRole["WarehouseAgent"] = "warehouse agent";
})(DefaultRole || (exports.DefaultRole = DefaultRole = {}));
//# sourceMappingURL=roles.constants.js.map