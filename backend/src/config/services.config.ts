
export const SERVICES: Levelup.CMS.V1.Utils.SystemStructure.TMicroService[] = [
  'auth',
  'content',
  'storage',
];

export const SERVICE_PORTS: {
  [service in Levelup.CMS.V1.Utils.SystemStructure.TMicroService]: number
} = {
  DEFAULT: 6000,
  auth: 6003,
  content: 6004,
  storage: 6005,
  //
};

