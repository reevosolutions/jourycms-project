"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadServicePermissions = void 0;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 28-03-2024 23:56:03
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logging_1 = __importDefault(require("../logging"));
const levelup_http_client_1 = __importDefault(require("../requests/levelup-http-client"));
const config_1 = __importDefault(require("../../config"));
const exceptions_1 = require("../exceptions");
const timer_utilities_1 = require("./timer.utilities");
const typedi_1 = __importDefault(require("typedi"));
const cache_manager_1 = __importDefault(require("../../managers/cache-manager"));
const exceptions_2 = __importDefault(require("../../exceptions"));
const logger = (0, logging_1.default)('UTILITY', 'Permissions');
const SERVICES_DIR = path_1.default.join(__dirname, '../../services');
const EXCLUDED_FILES = [
    'amqp-events.service.ts',
    'base.service.ts',
];
const loadServicePermissions = async () => {
    try {
        return;
        // Handle the app attribution
        const cache = typedi_1.default.get(cache_manager_1.default);
        const apps = await cache.apps.list();
        if (!(apps === null || apps === void 0 ? void 0 : apps.length))
            throw new exceptions_2.default.LevelupException('There is no apps created.');
        /**
         * Delay to ensure that the auth service is up, on restart services
         */
        await (0, timer_utilities_1.delay)(2000);
        // Get a list of files in the directory
        const files = fs_1.default.readdirSync(SERVICES_DIR);
        // Loop through each file
        for (let idx = 0; idx < files.length; idx++) {
            const file = files[idx];
            // Check if the file is excluded
            if (EXCLUDED_FILES.includes(file)) {
                continue;
            }
            // Get the full path of the file
            const filePath = path_1.default.join(SERVICES_DIR, file);
            // Check if the file is a TypeScript file
            if (filePath.endsWith('.service.ts')) {
                try {
                    // Dynamically import the file
                    const module = require(filePath);
                    for (let idx = 0; idx < apps.length; idx++) {
                        const app = apps[idx];
                        // Check if the exported function exists
                        if (module.levelupExportServicePermissions) {
                            // Execute the function and get the return value
                            const { GROUPS, PERMISSIONS } = module.levelupExportServicePermissions();
                            // Output the return value
                            for (let idx = 0; idx < Object.keys(GROUPS).length; idx++) {
                                const group = Object.keys(GROUPS)[idx];
                                try {
                                    const { data: { data, error } } = await levelup_http_client_1.default.post(`${config_1.default.http.services.api.auth}/permission-groups`, {
                                        data: {
                                            app: app === null || app === void 0 ? void 0 : app._id,
                                            name: group,
                                            description: GROUPS[group],
                                            is_system: true
                                        }
                                    });
                                    if ((error === null || error === void 0 ? void 0 : error.status) === 409)
                                        logger.success(`Permission group "${group}" already exists`);
                                    if (!error)
                                        logger.success(`Permission group "${group}" created`);
                                    error && error.status !== 409 && logger.error('http error', (0, exceptions_1.errorToObject)(error));
                                }
                                catch (error) {
                                    // ignore error
                                    logger.error('error', (0, exceptions_1.errorToObject)(error));
                                }
                                const perms = PERMISSIONS[group];
                                for (let index = 0; index < perms.length; index++) {
                                    const name = perms[index];
                                    try {
                                        const { data: { data, error } } = await levelup_http_client_1.default.post(`${config_1.default.http.services.api.auth}/permissions`, {
                                            data: {
                                                app: app === null || app === void 0 ? void 0 : app._id,
                                                group,
                                                name,
                                                description: '',
                                                is_system: true
                                            }
                                        });
                                        if ((error === null || error === void 0 ? void 0 : error.status) === 409)
                                            logger.success(`Permission "${name}" already exists`);
                                        if (!error)
                                            logger.success(`Permission "${name}" created`);
                                        error && error.status !== 409 && logger.error('http error', (0, exceptions_1.errorToObject)(error));
                                    }
                                    catch (error) {
                                        // ignore error
                                        logger.error('error', (0, exceptions_1.errorToObject)(error));
                                    }
                                }
                            }
                        }
                        else {
                            logger.warn(`No levelupExportServicePermissions function found in ${file}`);
                        }
                    }
                }
                catch (error) {
                    logger.error(`Error while requiring ${file}:`, error);
                }
            }
        }
        ;
    }
    catch (error) {
        logger.error(`Error while loading service permissions`, error);
    }
};
exports.loadServicePermissions = loadServicePermissions;
//# sourceMappingURL=permissions.utilities.js.map