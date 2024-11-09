
export const SERVICES: Levelup.CMS.V1.Utils.SystemStructure.TMicroService[] = [
  'auth',
  'content',
  'storage',
  'system',
  'auth'
];

export const SERVICE_PORTS: {
  [service in Levelup.CMS.V1.Utils.SystemStructure.TMicroService]: number
} = {
  DEFAULT: 6000,
  system: 6001,
  auth: 6003,
  content: 6004,
  storage: 6005,
  //
};

