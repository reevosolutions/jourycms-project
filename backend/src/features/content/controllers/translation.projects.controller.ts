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
import TranslationProjectsService from '../services/translation.projects.service';

/**
 * @generator Levelup
 * @description This file is used to build the Projects controller
 */

export const ROOT_PATH = '/translation/projects';


import EntityAlias = Levelup.CMS.V1.Content.Translation.Entity.Project;
import ApiAlias = Levelup.CMS.V1.Content.Translation.Api.Projects;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "ProjectsController");
  const route = Router();


  app.use(
    ROOT_PATH,
    middlewares.AUTH.requireUser,
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
        const translationProjectsService = Container.get(TranslationProjectsService);


        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await translationProjectsService.list(req.query as unknown as ApiAlias.List.Request, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { id } = req.params;

        const result = await translationProjectsService.getById(id, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { name } = req.params;

        const result = await translationProjectsService.getByName(name, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await translationProjectsService.create(req.body as ApiAlias.Create.Request, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await translationProjectsService.update(id, req.body as ApiAlias.Update.Request, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await translationProjectsService.delete(id, AUTH_DATA);

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
        const translationProjectsService = Container.get(TranslationProjectsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await translationProjectsService.restore(id, AUTH_DATA);

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

