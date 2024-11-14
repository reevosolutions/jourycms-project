"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 05:32:17
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOT_PATH = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const middlewares_1 = __importDefault(require("../../../middlewares"));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const requests_1 = require("../../../utilities/requests");
const get_auth_data_1 = require("../../../utilities/requests/get-auth-data");
const dev_service_1 = __importDefault(require("../services/dev.service"));
/**
 * @generator Levelup
 * @description This file is used to build the Users controller
 */
exports.ROOT_PATH = '/dev';
exports.default = (app) => {
    const logger = (0, logging_1.default)("CONTROLLER", "dev");
    const route = (0, express_1.Router)();
    app.use(exports.ROOT_PATH, middlewares_1.default.AUTH.requireUser, route);
    route.get('/', async (req, res, next) => {
        try {
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            const devService = typedi_1.default.get(dev_service_1.default);
            return (0, requests_1.respond)(res, {
                status: "success",
            }, 200);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
};
//# sourceMappingURL=dev.controller.js.map