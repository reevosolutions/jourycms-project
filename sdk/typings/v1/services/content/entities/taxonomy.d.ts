declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface ITaxonomySnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
          }

          export interface Taxonomy
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            slug: string;
            name: string;

            description: string;
            description_unformatted: string;
            description_structured: JSONContent;

            // hierarchy
            is_multi: boolean;
            is_hierarchical: boolean;

            labels: {
              singular: string;
              plural: string;
              list: string;
              add: string;
              edit: string;
              delete: string;
            };
            
            snapshots: ITaxonomySnapshots;
          }
        }
      }
    }
  }
}
