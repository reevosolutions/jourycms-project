/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 28-03-2024 23:56:03
 */
import fs from 'fs';
import path from 'path';
import initLogger from '../logging';
import levelupHttpClient from '../requests/levelup-http-client';
import config from '../../config';
import { errorToObject } from '../exceptions';
import { delay } from './timer.utilities';
import Container from 'typedi';
import CacheManager from '../../managers/cache-manager';
import exceptions from '../../exceptions';

const logger = initLogger('UTILITY', 'Permissions');

const SERVICES_DIR = path.join(__dirname, '../../services');
const EXCLUDED_FILES = [
  'amqp-events.service.ts',
  'base.service.ts',
];

type ExportObject = {
  levelupExportServicePermissions?: any;
};

export const loadServicePermissions = async () => {
  try {

    return;
    
    // Handle the app attribution
    const cache = Container.get(CacheManager);
    const apps = await cache.apps.list();
    if (!apps?.length) throw new exceptions.LevelupException('There is no apps created.');

    /**
     * Delay to ensure that the auth service is up, on restart services
     */
    await delay(2000);

    // Get a list of files in the directory
    const files = fs.readdirSync(SERVICES_DIR);

    // Loop through each file
    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];

      // Check if the file is excluded
      if (EXCLUDED_FILES.includes(file)) {
        continue;
      }
      // Get the full path of the file
      const filePath = path.join(SERVICES_DIR, file);

      // Check if the file is a TypeScript file
      if (filePath.endsWith('.service.ts')) {
        try {
          // Dynamically import the file
          const module = require(filePath) as ExportObject;

          for (let idx = 0; idx < apps.length; idx++) {
            const app = apps[idx];

            // Check if the exported function exists
            if (module.levelupExportServicePermissions) {
              // Execute the function and get the return value
              const { GROUPS, PERMISSIONS } = module.levelupExportServicePermissions();



              // Output the return value
              for (let idx = 0; idx < Object.keys(GROUPS).length; idx++) {

                const group = Object.keys(GROUPS)[idx];
                try {
                  const { data: { data, error } } = await levelupHttpClient.post<Levelup.CMS.V1.Auth.Api.PermissionGroups.Create.Response>(`${config.http.services.api.auth}/permission-groups`, {
                    data: {
                      app: app?._id,
                      name: group,
                      description: GROUPS[group],
                      is_system: true
                    }
                  })
                  if (error?.status === 409) logger.success(`Permission group "${group}" already exists`);
                  if (!error) logger.success(`Permission group "${group}" created`);
                  error && error.status !== 409 && logger.error('http error', errorToObject(error));
                } catch (error) {
                  // ignore error
                  logger.error('error', errorToObject(error));
                }

                const perms = PERMISSIONS[group];
                for (let index = 0; index < perms.length; index++) {
                  const name = perms[index];
                  try {
                    const { data: { data, error } } = await levelupHttpClient.post<Levelup.CMS.V1.Auth.Api.Permissions.Create.Response>(`${config.http.services.api.auth}/permissions`, {
                      data: {
                        app: app?._id,
                        group,
                        name,
                        description: '',
                        is_system: true
                      }
                    })
                    if (error?.status === 409) logger.success(`Permission "${name}" already exists`);
                    if (!error) logger.success(`Permission "${name}" created`);

                    error && error.status !== 409 && logger.error('http error', errorToObject(error));

                  } catch (error) {
                    // ignore error
                    logger.error('error', errorToObject(error));
                  }
                }
              }
            }
            else {

              logger.warn(`No levelupExportServicePermissions function found in ${file}`);
            }
          }

        } catch (error) {
          logger.error(`Error while requiring ${file}:`, error);
        }
      }
    };
  } catch (error) {
    logger.error(`Error while loading service permissions`, error);
  }

}





