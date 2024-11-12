/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:52
 */
import { Router } from 'express';
import Container from 'typedi';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';
import TranslationItemsService from '../services/translation.items.service';
/**
 * @generator Levelup
 * @description This file is used to build the Items controller
 */
export const ROOT_PATH = '/translation/items';
export default (app) => {
    const logger = initLogger("CONTROLLER", "ItemsController");
    const route = Router();
    app.use(ROOT_PATH, route);
    /**
     * List
     */
    route.get('/', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await translationItemsService.list(req.query, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result);
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
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await translationItemsService.getById(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result);
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
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await translationItemsService.create(req.body, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result, 201);
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
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await translationItemsService.update(id, req.body, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result);
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
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await translationItemsService.delete(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result);
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
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const translationItemsService = Container.get(TranslationItemsService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await translationItemsService.restore(id, AUTH_DATA);
            /**
             * Respond to the client
             */
            return respond(res, result);
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
//# sourceMappingURL=translation.items.controller.js.map