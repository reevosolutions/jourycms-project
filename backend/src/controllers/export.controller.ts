/**
 * @description this is shared file between all services .. it can be found in /controllers/export.controller.ts
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 09-03-2024 22:27:40
 */

import { NextFunction, Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import Container from 'typedi';
import exceptions from '../exceptions';
import middlewares from '../middlewares';
import ExportManager from '../utilities/exporters/export.manager';
import initLogger from '../utilities/logging';
import { respond } from '../utilities/requests';
import { getAuthData } from '../utilities/requests/get-auth-data';

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 09-03-2024 22:28:11
 */
export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "ExportController");
  const route = Router();

  app.use('/export', route);

  route.get('/items',
    middlewares.AUTH.requireUser,
    async (req: Request, res: Response, next: NextFunction) => {

      try {
        const exportManager = Container.get(ExportManager);

        /**
         * Always get the auth data at the beginning of the function
         */
        const AUTH_DATA = await getAuthData(req);

        const result = await exportManager.list(req.query as unknown as Levelup.V2.Shared.Export.Api.ExportItems.List.Request, AUTH_DATA);
        return respond<Levelup.V2.Shared.Export.Api.ExportItems.List.Response>(res, result);
      } catch (e) {
        return next(e);
      }
    });


  route.get(
    '/items/:id/file',
    middlewares.AUTH.requireUser,
    async (req: Request, res: Response, next: NextFunction) => {

      const { id } = <{ id: string }>req.params;
      try {
        const exportManager = Container.get(ExportManager);
        const doc = await exportManager.getById(id);
        if (!doc?._id) throw new exceptions.ItemNotFoundException('DB document not found');
        const filename = path.join(__dirname, "../../exports", exportManager.generateExportFileName(doc));

        if (!fs.existsSync(filename)) throw new exceptions.ItemNotFoundException('Excel file could not be found');

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${exportManager.generateExportFileName(doc)}`
        );

        res.sendFile(filename);
      } catch (e) {
        return next(e);
      }
    },
  );

};


