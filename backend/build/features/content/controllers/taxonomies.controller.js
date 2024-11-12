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
import TaxonomiesService from '../services/taxonomies.service';
/**
 * @generator Levelup
 * @description This file is used to build the Taxonomies controller
 */
export const ROOT_PATH = '/taxonomies';
export default (app) => {
    const logger = initLogger("CONTROLLER", "TaxonomiesController");
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await taxonomiesService.list(req.query, AUTH_DATA);
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await taxonomiesService.getById(id, AUTH_DATA);
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
     * GetByName
     */
    route.get('/by-name/:name', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { name } = req.params;
            const result = await taxonomiesService.getByName(name, AUTH_DATA);
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await taxonomiesService.create(req.body, AUTH_DATA);
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await taxonomiesService.update(id, req.body, AUTH_DATA);
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await taxonomiesService.delete(id, AUTH_DATA);
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
            const taxonomiesService = Container.get(TaxonomiesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await taxonomiesService.restore(id, AUTH_DATA);
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
//# sourceMappingURL=taxonomies.controller.js.map