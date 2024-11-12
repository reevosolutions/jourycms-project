/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:51
 */

import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import middlewares from '../../../middlewares';
import UsersService from '../services/users.service';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';

/**
 * @generator Levelup
 * @description This file is used to build the Users controller
 */

export const ROOT_PATH = '/users';


import EntityAlias = Levelup.CMS.V1.Users.Entity.User;
import ApiAlias = Levelup.CMS.V1.Users.Api.Users;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "UsersController");
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);


        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await usersService.list(req.query as unknown as ApiAlias.List.Request, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { id } = req.params;


        const result = await usersService.getById(id, AUTH_DATA);

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
   * GetByTrackingId
   */
  route.get('/by-tracking-id/:tracking_id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { tracking_id } = req.params;

        const result = await usersService.getByTrackingId(tracking_id, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await usersService.create(req.body as ApiAlias.Create.Request, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;



        const result = await usersService.update(id, req.body as ApiAlias.Update.Request, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await usersService.delete(id, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const usersService = Container.get(UsersService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await usersService.restore(id, AUTH_DATA);

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

