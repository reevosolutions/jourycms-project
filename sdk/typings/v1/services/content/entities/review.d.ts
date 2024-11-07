declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface IReviewSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
            article: {
              _id: Utils.Common.ID;
              slug: string;
              title: string;
            };
          }

          export interface Review
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;

            article: Utils.Common.ID;
            slug: string;

            body: string;
            body_unformatted: string;
            body_structured: JSONContent;

            value: number;

            snapshots: IReviewSnapshots;
          }
        }
      }
    }
  }
}
