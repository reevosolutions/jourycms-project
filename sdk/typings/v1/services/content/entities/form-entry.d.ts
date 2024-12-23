declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface IFormEntrySnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
          }
          
          export interface FormEntry
            extends Utils.Entity.General.ICreatable,
            Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            slug: string;
            form: Utils.Common.ID;
            data: { [Key: string]: any };
            snapshots: IFormEntrySnapshots;
          }
        }
      }
    }
  }
}
