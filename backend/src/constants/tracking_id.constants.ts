export const LEVELUP_ITEM_SHORTCUTS: {
  [entity in
  | Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
  ]: string;
} = {
  
  
  // system
  app: "APP",

  // auth
  apiKey: "KEY",
  user: "USR",
  role: "ROL",
  permission: "PRM",
  permissionGroup: "PMG",

  // content
  articleType: "ATP",
  article: "ART",
  comment: "CMT",
  review: "REV",
  term: "TAG",
  taxonomy: "TXN",
  translationItem: "TRI",
  translationProject: "TRP",
  translationNamespace: "TRN",
  uploadedFile: "FLE"
} as const;


export const ITEM_SHORTCUTS = {
  ...LEVELUP_ITEM_SHORTCUTS,
} as const;


export type TShortcutsType = typeof ITEM_SHORTCUTS;
export type TShortcutEntities = keyof TShortcutsType;
export type TShortcutPrefix = (typeof ITEM_SHORTCUTS)[TShortcutEntities];
