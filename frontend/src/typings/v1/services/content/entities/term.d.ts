declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface ITermSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
            taxonomy: {
              _id: Utils.Common.ID;
              slug: string;
              name: string;
              is_hierarchical: boolean;
              is_multi: boolean;
            };
          }

          export interface ITermInsights {
            article_count: number;
          }

          export interface Term
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            // TODO finish this
            _id: Utils.Common.ID;
            taxonomy: Utils.Common.ID;
            parent: Utils.Common.ID | null;
            children: Utils.Common.ID[];
            slug: string;
            name: string;

            description: string;
            description_unformatted: string;
            description_structured: { [Key: string]: any };

            snapshots: ITermSnapshots;
            insights: ITermInsights;
          }
        }
      }
    }
  }
}
