import { Router } from 'express';
import config from '../config';
import { errorToObject } from '../utilities/exceptions';
import { getServerStatusReport } from '../utilities/system';
import initLogger from '../utilities/logging';
import ExportManager from '../managers/export-manager/index';
import Container from 'typedi';


// guaranteed to get dependencies
export default (): Router => {
  const logger = initLogger('CONTROLLER', 'shared');
  const app = Router();
  app.head('/', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      service: config.currentService.name,
      server: 'UP'
    });
  });

  app.get('/status', (req, res) => {
    res.status(200).json({
      service: config.currentService.name,
      server: 'UP'
    });
  });

  app.get(config.http.api.prefix, (req, res) => {
    res.json({
      service: config.currentService.name,
      server: 'UP'
    });
  });
  app.get('/status/json', async (req, res) => {
    try {
      const status = await getServerStatusReport();
      logger.debug('server status', status);
      res.json(status);
    } catch (error) {
      res.json({
        service: config.currentService.name,
        server: 'UP',
        error: errorToObject(error)
      });
    }
  });

  /**
   * Send export file
   */
  app.get('/export/:entity/:id', async (req, res) => {
    try {
      const { entity, id } = req.params;
      const exportManager = Container.get(ExportManager);
      const filePath = await exportManager.getExportFilePath(entity as any, id);
      res.sendFile(filePath);
    } catch (error) {
      res.json({
        service: config.currentService.name,
        server: 'UP',
        error: errorToObject(error)
      });
    }
  });
  return app;
};


