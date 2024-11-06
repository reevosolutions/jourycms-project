/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:52
 */

import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import Joi from 'joi';
import exceptions from '../../../exceptions';
import middlewares from '../../../middlewares';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { errorToObject } from '../../../utilities/exceptions';
import { getAuthData } from '../../../utilities/requests/get-auth-data';
import { validateRouteID } from '../../../utils/validators/utils';
import TermsService from '../services/terms.service';

/**
 * @generator Levelup
 * @description This file is used to build the Terms controller
 */

export const ROOT_PATH = '/terms';


import EntityAlias = Levelup.CMS.V1.Content.Entity.Term;
import ApiAlias = Levelup.CMS.V1.Content.Api.Terms;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "TermsController");
  const route = Router();


  app.use(
    ROOT_PATH,
    route
  );

  /**
   * List
   */
  route.get('/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);


        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await tagsService.list(req.query as unknown as ApiAlias.List.Request, AUTH_DATA);

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
    });

  /**
   * GetOne
   */
  route.get('/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { id } = req.params;

        const result = await tagsService.getById(id, AUTH_DATA);

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
    });

  
  
  
  /**
   * GetByName
   */
  route.get('/by-name/:name',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { name } = req.params;

        const result = await tagsService.getByName(name, AUTH_DATA);

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
    });


  /**
   * Create
   */
  route.post('/',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await tagsService.create(req.body as ApiAlias.Create.Request, AUTH_DATA);

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
    });


  /**
   * Update
   */
  route.put('/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await tagsService.update(id, req.body as ApiAlias.Update.Request, AUTH_DATA);

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
    });

  /**
   * Delete
   */
  route.delete('/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await tagsService.delete(id, AUTH_DATA);

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
    });

  /**
   * Restore
   */
  route.delete('/:id/restore',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const tagsService = Container.get(TermsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await tagsService.restore(id, AUTH_DATA);

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
    });




}

