/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:52
 */

import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';
import FormEntriesService from '../services/form-entries.service';

/**
 * @generator Levelup
 * @description This file is used to build the FormEntries controller
 */

export const ROOT_PATH = '/form-entries';


import EntityAlias = Levelup.CMS.V1.Content.Entity.FormEntry;
import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "FormEntriesController");
  const route = Router();

  app.use(ROOT_PATH, route);

  /**
   * AggregateByRoles
   */
  route.get(
    "/aggregate-by-forms",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);


        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await formEntriesService.aggregateByForms();

        /**
         * Respond to the client
         */
        return respond<ApiAlias.AggregateByTypes.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * List
   */
  route.get(
    "/",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await formEntriesService.list(
          req.query as unknown as ApiAlias.List.Request,
          AUTH_DATA
        );

        /**
         * Respond to the client
         */
        return respond<ApiAlias.List.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * GetOne
   */
  route.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { id } = req.params;

        const result = await formEntriesService.getById(id, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.GetOne.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * GetBySlug
   */
  route.get(
    "/by-slug/:slug",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { slug } = req.params;

        const result = await formEntriesService.getBySlug(slug, AUTH_DATA);

        /**
         * Respond to the client
         */
        respond<ApiAlias.GetOne.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * Create
   */
  route.post(
    "/",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await formEntriesService.create(
          req.body as ApiAlias.Create.Request,
          AUTH_DATA
        );

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Create.Response>(res, result, 201);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * Update
   */
  route.put(
    "/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await formEntriesService.update(
          id,
          req.body as ApiAlias.Update.Request,
          AUTH_DATA
        );

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Update.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * Delete
   */
  route.delete(
    "/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await formEntriesService.delete(id, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Delete.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );

  /**
   * Restore
   */
  route.delete(
    "/:id/restore",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const formEntriesService = Container.get(FormEntriesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await formEntriesService.restore(id, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Delete.Response>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );
}

