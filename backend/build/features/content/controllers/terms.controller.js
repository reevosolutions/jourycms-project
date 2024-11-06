"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:52
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
const terms_service_1 = __importDefault(require("../services/terms.service"));
/**
 * @generator Levelup
 * @description This file is used to build the Terms controller
 */
exports.ROOT_PATH = '/terms';
exports.default = (app) => {
    const logger = (0, logging_1.default)("CONTROLLER", "TermsController");
    const route = (0, express_1.Router)();
    app.use(exports.ROOT_PATH, middlewares_1.default.AUTH.requireUser, route);
    /**
     * List
     */
    route.get('/', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await tagsService.list(req.query, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * GetOne
     */
    route.get('/:id', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await tagsService.getById(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * GetByName
     */
    route.get('/by-name/:name', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { name } = req.params;
            const result = await tagsService.getByName(name, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * Create
     */
    route.post('/', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await tagsService.create(req.body, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result, 201);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * Update
     */
    route.put('/:id', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await tagsService.update(id, req.body, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * Delete
     */
    route.delete('/:id', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await tagsService.delete(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
    /**
     * Restore
     */
    route.delete('/:id/restore', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            /**
             * Load the required services and managers
             */
            const tagsService = typedi_1.default.get(terms_service_1.default);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await tagsService.restore(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return (0, requests_1.respond)(res, result);
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
//# sourceMappingURL=terms.controller.js.map