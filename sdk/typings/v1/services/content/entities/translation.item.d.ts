declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        /**
         * SubDomain Translation
         */
        export namespace Translation {
          export namespace Entity {
            export interface IItemUpdateHistoryItem {
              translation: string;
              date: Date;
              updated_by: Utils.Entity.Snapshots.Auth.User;
              auto_translated: boolean;
            }

            export interface IItemTranslation {
              language: LanguageCode;
              translation: string;
              date: Date;
              is_auto_translated: boolean;
              is_approved: boolean;
              updated_by: Utils.Entity.Snapshots.Auth.User;
              approved_by: Utils.Entity.Snapshots.Auth.User;
              update_history: IItemUpdateHistoryItem[];
            }

            export interface Item
              extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
              _id: Utils.Common.ID;
              key: string;
              project: Utils.Common.ID; // Project._id
              namespace: string; // Namespace.name
              comments: {
                content: string;
                user: Utils.Entity.Snapshots.Auth.User;
                date: Date;
              }[];
              is_new: boolean;
              translations: IItemTranslation[];
            }
          }
        }
      }
    }
  }
}
