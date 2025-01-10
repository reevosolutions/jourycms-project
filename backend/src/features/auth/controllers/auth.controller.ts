/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-17 22:54:30
*/

import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import middlewares from '../../../middlewares';
import AuthService from '../services/auth.service';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';

/**
 * @generator Levelup
 * @description This file is used to build the Auth controller
 */

export const ROOT_PATH = '/auth';

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth;


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "AuthController");
  const route = Router();


  app.use(
    ROOT_PATH,
    route
  );


  /**
   * Register
   */
  route.post('/register',
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        const { data } = req.body as ApiAlias.Signup.Request;

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const authService = Container.get(AuthService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const result = await authService.register({ data }, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Signin.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */


        return next(error);

      }
    });

  /**
   * Login
   */
  route.post('/login',
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        const { data } = req.body as ApiAlias.Signin.Request;

        /**
         * Validate the request body
         */

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const authService = Container.get(AuthService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const result = await authService.login(data?.email, data?.password);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.Signin.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */


        return next(error);

      }
    });
  /**
   * ChangePassword
   */
  route.post('/change-password',
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        const { data } = req.body as ApiAlias.ChangePassword.Request;

        /**
         * Validate the request body
         */

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const authService = Container.get(AuthService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const result = await authService.changePassword({ data }, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.ChangePassword.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */


        return next(error);

      }
    });

  /**
   * refresh-token
   */
  route.post('/refresh-token',
    async (req: Request, res: Response, next: NextFunction) => {
      try {

        const { data } = req.body as ApiAlias.RefreshToken.Request;

        /**
         * Validate the request body
         */

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        /**
         * Load the required services and managers
         */
        const authService = Container.get(AuthService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */
        const result = await authService.refreshToken({ data }, AUTH_DATA);

        /**
         * Respond to the client
         */
        return respond<ApiAlias.RefreshToken.Response>(res, result);

      } catch (error) {

        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */


        return next(error);

      }
    });


}

