/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-01 02:15:51
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
import RolesService from '../services/roles.service';

/**
 * @generator Levelup
 * @description This file is used to build the Roles controller
 */

export const ROOT_PATH = '/roles';


import EntityAlias = Levelup.CMS.V1.Auth.Entity.Role;
import ApiAlias = Levelup.CMS.V1.Auth.Api.Roles;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "RolesController");
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
        const rolesService = Container.get(RolesService);


        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await rolesService.list(req.query as unknown as ApiAlias.List.Request, AUTH_DATA);

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
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { id } = req.params;

        const result = await rolesService.getById(id, AUTH_DATA);

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const { name } = req.params;

        const result = await rolesService.getByName(name, AUTH_DATA);

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
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await rolesService.create(req.body as ApiAlias.Create.Request, AUTH_DATA);

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
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await rolesService.update(id, req.body as ApiAlias.Update.Request, AUTH_DATA);

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
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await rolesService.delete(id, AUTH_DATA);

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
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await rolesService.restore(id, AUTH_DATA);

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
   * -------------------------------------------------------------------------- 
   *                            MergeRoles                           
   * -------------------------------------------------------------------------- 
   * @method PUT
   * @link /roles/merge/:source_id/:destination_id
   * @fires RolesService.mergeRoles
   * @param {Levelup.CMS.V1.Auth.Api.Roles.MergeRoles.Request} query
   * @returns {Levelup.CMS.V1.Auth.Api.Roles.MergeRoles.Response}
   *
   */

  route.put('/merge/:source_id/:destination_id',
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { source_id, destination_id } = req.params;

        const result = await rolesService.mergeRoles(source_id, destination_id, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.MergeRoles.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);

      }
    });

  /**
   * -------------------------------------------------------------------------- 
   *                            ChangePermissions                           
   * -------------------------------------------------------------------------- 
   * @method PUT
   * @link /api/v2/users/:id/change-permissions
   * @fires Service.ChangePermissions
   * @param {Levelup.CMS.V1.Auth.Api.Roles.ChangePermissions.Request} query
   * @returns {Levelup.CMS.V1.Auth.Api.Roles.ChangePermissions.Response}
   *
   */
  route.put('/:id/change-permissions',
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await rolesService.changePermissions({
          data: {
            ...req.body.data || {},
            role_id: id,
          }
        }, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.ChangePermissions.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);

      }
    });

  /**
   * -------------------------------------------------------------------------- 
   *                            ListRolePermissions                           
   * -------------------------------------------------------------------------- 
   * @method GET
   * @link /api/v2/users/:id/permissions
   * @fires UsersService.ListRolePermissions
   * @param {Levelup.CMS.V1.Auth.Api.Roles.ListRolePermissions.Request} query
   * @returns {Levelup.CMS.V1.Auth.Api.Users.ListRolePermissions.Response}
   *
   */
  route.get('/:id/permissions',
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const rolesService = Container.get(RolesService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const { id } = req.params;

        const result = await rolesService.listRolePermissions(id, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.ListRolePermissions.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);

      }
    });


}

