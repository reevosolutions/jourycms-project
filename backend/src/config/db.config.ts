/**
 * @description Database Configuration
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 05:38:21
 */

import initLogger from "../utilities/logging";

const logger = initLogger('APPLICATION', 'DB_CONFIG');

// Define the type for the database configuration
export type TDatabaseConfig = {
  atlasActivated: boolean;
  atlas: {
    version: number;
    uriV2: string;
    uriV4: string;
    uri: string;
    username: string;
    password: string;
    replicaSet: string;
  };
  replicaSet: {
    uri: string;
    username: string;
    password: string;
    replicaSet: string;
  };
  local: {
    uri: string;
    username: string;
    password: string;
  };
  dbName: string;
  dbNamePrefix: string;
  uri: string;
  connectTo: 'local' | 'rs' | 'atlas';
};

export const getDatabaseName = (service: string) => {
  // Get the database name prefix from the environment variable
  const DB_NAME_PREFIX = process.env.MONGODB_DB_NAME_PREFIX || '';
  // Generate the database name based on the service name and prefix
  const DB_NAME = `${DB_NAME_PREFIX}${service}`;
  return DB_NAME;
}


// Function to get the database configuration
const getDatabaseConfig = () => {

  // Define the service name based on the environment variable
  const SERVICE_NAME = (process.env.SERVICE_NAME || '').toLowerCase() as Levelup.CMS.V1.Utils.SystemStructure.TMicroService;

  // Define the list of services excluded from Atlas
  const SERVICES_EXCLUDED_FROM_ATLAS: Levelup.CMS.V1.Utils.SystemStructure.TMicroService[] = [
    // 'cm',
  ];

  // Define the list of services excluded from Replica Set
  const SERVICES_EXCLUDED_FROM_RS: Levelup.CMS.V1.Utils.SystemStructure.TMicroService[] = [];


  // Get the database name prefix from the environment variable
  const DB_NAME_PREFIX = process.env.MONGODB_DB_NAME_PREFIX || '';
  // Generate the database name based on the service name and prefix
  const DB_NAME = getDatabaseName(SERVICE_NAME);

  // Initialize the configuration object
  const config: TDatabaseConfig = {
    atlasActivated: process.env.MONGODB_ATLAS_ACTIVATED === 'true' || process.env.MONGODB_ATLAS_ACTIVATED === '1',
    atlas: {
      version: parseInt(process.env.MONGODB_ATLAS_VERSION || '2') || 2,
      uriV2: process.env.MONGODB_ATLAS_URI_2,
      uriV4: process.env.MONGODB_ATLAS_URI_4,
      uri: '',
      username: process.env.MONGODB_ATLAS_USER,
      password: process.env.MONGODB_ATLAS_PASS,
      replicaSet: process.env.MONGODB_ATLAS_REPLICASET,
    },
    replicaSet: {
      uri: process.env.MONGODB_RS_URI,
      username: process.env.MONGODB_RS_USER,
      password: process.env.MONGODB_RS_PASS,
      replicaSet: process.env.MONGODB_RS_REPLICASET,
    },
    local: {
      uri: process.env.MONGODB_LOCAL_URI,
      username: process.env.MONGODB_LOCAL_USER,
      password: process.env.MONGODB_LOCAL_PASS,
    },
    dbNamePrefix: DB_NAME_PREFIX,
    dbName: DB_NAME,
    uri: '', // will be generated
    connectTo: 'local',
  };

  // Determine the connection type based on the environment
  config.connectTo = process.env.NODE_ENV === 'development'
    ? (process.env.MONGODB_DEV_CONNECT_TO || 'local') as TDatabaseConfig['connectTo']
    : (process.env.MONGODB_CONNECT_TO || 'local') as TDatabaseConfig['connectTo'];

  // Check if the service is excluded from Atlas or Replica Set, and fallback to local connection
  if (
    (config.connectTo === 'atlas' && SERVICES_EXCLUDED_FROM_ATLAS.includes(SERVICE_NAME)) ||
    (config.connectTo === 'rs' && SERVICES_EXCLUDED_FROM_RS.includes(SERVICE_NAME))
  ) {
    config.connectTo = 'local';
  }

  // Generate the MongoDB URI based on the connection type
  if (config.connectTo === 'rs') {
    config.uri = `mongodb://${config.replicaSet.username}:${config.replicaSet.password}@${config.replicaSet.uri}/${config.dbName}?replicaSet=${config.replicaSet.replicaSet}&authSource=admin&retryWrites=true&w=majority`;
  } else if (config.connectTo === 'atlas') {
    config.uri = config.atlas.version === 4
      ? `mongodb+srv://${config.atlas.username}:${config.atlas.password}@${config.atlas.uriV4}/${config.dbName}?retryWrites=true&w=majority`
      : `mongodb://${config.atlas.username}:${config.atlas.password}@${config.atlas.uriV2}/${config.dbName}?ssl=true&replicaSet=${config.atlas.replicaSet}&authSource=admin&retryWrites=true&w=majority`;
  } else {
    config.uri = `mongodb://${config.local.username && config.local.password ? `${config.local.username}:${config.local.password}@` : ''}${config.local.uri || 'localhost:27017'}/${config.dbName}`;
  }

  // Return the configuration object
  return config;
};

// Export the getDatabaseConfig function as the default export
export default getDatabaseConfig;

