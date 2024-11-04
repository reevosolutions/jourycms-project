/**
 * @description This file exports all the middlewares
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 06:54:22
 */

import attachAuthData from './attach-auth-data.middleware';
import authenticateService from './authenticate-service.middleware';
import handleJWT from './handle-jwt.middleware';
import endpointNotFoundHandler from './endpoint-not-found-handler.middleware';
import errorHandler from './error-handler.middleware';
import rateLimiter from './rate-limiter.middleware';
import authMiddlewares from './auth';
import uploadingMiddlewares from './uploading';
//
import secureApiWithAppKeyMiddleware from './secure-api-by-app-key.middleware';
import unlessFromService from './unless-from-service.middleware';

export default {
  //
  AUTH: authMiddlewares,
  //
  UPLOADING: uploadingMiddlewares,
  /**
   * @description Middleware to attach auth data to the request 
   */
  attachAuthData,
  /**
   * @description Middleware to authenticate service
   */
  authenticateService,
  /**
   * @description Middleware to handle JWT
   */
  handleJWT,
  /**
   * @description Middleware to handle 404 errors
   */
  endpointNotFoundHandler,
  /**
   * @description Middleware to handle errors
   */
  errorHandler,
  /**
   * @description Rate limiter middleware
   */
  rateLimiter,
  // ----------------------------------------
  /**
   * @description Secure Api with signature
   */
  secureApiWithAppKeyMiddleware,
  /**
   * @description Attach the calling service to req.attached_entities or apply the middleware if no service is found
   */
  unlessFromService,
};


