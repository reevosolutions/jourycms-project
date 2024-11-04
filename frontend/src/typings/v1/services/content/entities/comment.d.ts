declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface ICommentSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
            article: {
              _id: Utils.Common.ID;
              slug: string;
              title: string;
            };
          }

          export interface Comment
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            parent: Utils.Common.ID;
            children: Utils.Common.ID[];
            article: Utils.Common.ID;
            slug: string;

            body: string;
            body_unformatted: string;
            body_structured: { [Key: string]: any };

            snapshots: ICommentSnapshots;
          }
        }
      }
    }
  }
}
