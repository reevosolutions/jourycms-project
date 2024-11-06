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
import TranslationToolsService from '../services/translation.tools.service';

/**
 * @generator Levelup
 * @description This file is used to build the Projects controller
 */

export const ROOT_PATH = '/translation/tools';

import EntityAlias = Levelup.CMS.V1.Content.Translation.Entity.Project;
import ApiAlias = Levelup.CMS.V1.Content.Translation.Api.Tools;

export default (app: Router): void => {
  const logger = initLogger('CONTROLLER', 'TranslationToolsController');
  const route = Router();

  app.use(ROOT_PATH, route);

  /**
   * Create
   */
  route.post('/missing-key', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      /**
       * Always get the auth data at the beginning of the function
       */
      const AUTH_DATA = await getAuthData(req);

      /**
       * Load the required services and managers
       */
      const translationToolsService = Container.get(TranslationToolsService);

      /**
       * Call the service method if the validation conditions are fulfilled
       */

      const result = await translationToolsService.insertI18MissingKey(
        req.body as ApiAlias.InsertI18MissingKey.Request,
        AUTH_DATA
      );

      /**
       * Respond to the client
       */
      return respond<{
        key: string;
        hash: string;
        isNew: boolean;
      }>(res, result, result.isNew ? 201 : 200);
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
  route.get(
    '/load-translation/:project/:namespace/:language',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { project, namespace, language } = req.params;

        /**
         * Load the required services and managers
         */
        const translationToolsService = Container.get(TranslationToolsService);

        /**
         * Call the service method if the validation conditions are fulfilled
         */

        const result = await translationToolsService.loadNamespaceTranslation(project, namespace, language);

        /**
         * Respond to the client
         */
        return respond<{ [key: string]: string }>(res, result);
      } catch (error) {
        /**
         * Pass the error to the next middleware
         * the error logging logic is handled on the service layer
         */

        return next(error);
      }
    }
  );
};
