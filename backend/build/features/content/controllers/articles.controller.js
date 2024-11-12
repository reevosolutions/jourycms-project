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
import ArticlesService from '../services/articles.service';
/**
 * @generator Levelup
 * @description This file is used to build the Articles controller
 */
export const ROOT_PATH = '/articles';
export default (app) => {
    const logger = initLogger("CONTROLLER", "ArticlesController");
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await articlesService.list(req.query, AUTH_DATA);
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await articlesService.getById(id, AUTH_DATA);
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
     * GetBySlug
     */
    route.get('/by-slug/:slug', async (req, res, next) => {
        try {
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await getAuthData(req);
            /**
             * Load the required services and managers
             */
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { slug } = req.params;
            const result = await articlesService.getBySlug(slug, AUTH_DATA);
            /**
             * Respond to the client
             */
            respond(res, result);
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const result = await articlesService.create(req.body, AUTH_DATA);
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await articlesService.update(id, req.body, AUTH_DATA);
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await articlesService.delete(id, AUTH_DATA);
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
            const articlesService = Container.get(ArticlesService);
            /**
             * Call the service method if the validation conditions are fulfilled
             */
            const { id } = req.params;
            const result = await articlesService.restore(id, AUTH_DATA);
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
//# sourceMappingURL=articles.controller.js.map