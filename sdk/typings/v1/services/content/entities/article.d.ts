declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface IArticleAttributes {
            google_index_requested?: boolean;
          }
          export interface IArticleSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
          }
          export interface IArticleInsights {
            comment_count?: number;
            vote_count?: number;
            vote_value?: number;
            view_count?: number;
          }

          export interface Article
            extends Utils.Entity.General.ICreatable,
            Utils.Entity.General.IHasSearchMeta {
            _type: Utils.Common.ID | null;
            _id: Utils.Common.ID;
            slug: string;
            title: string;
            body: string;
            body_unformatted: string;
            body_structured: { [Key: string]: any };
            is_published: boolean;
            published_at: Date | null;
            is_featured: boolean;
            featured_image: Utils.Common.FileAttribute | null;
            article_type: Utils.Common.ID;
            related_tags: {
              _id: Utils.Common.ID;
              taxonomy: Utils.Common.ID;
              name: string;
              slug: string;
            }[];

            meta_fields: { [Key: string]: any };

            attributes: IArticleAttributes;
            snapshots: IArticleSnapshots;
            insights: IArticleInsights;
          }
        }
      }
    }
  }
}
