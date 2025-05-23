declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          type ICustomMetaField = {
            field_key: string;
            field_label: string;
            field_type: CustomFields.CustomFieldType;
            field_options: CustomFields.MetaField<CustomFields.CustomFieldType, boolean>['field_options'];
          };

          export interface IArticleTypeSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
          }

          export interface IArticleTypeInsights {
            article_count: number;
          }

          export interface ArticleType
            extends Utils.Entity.General.ICreatable,
            Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            slug: string;
            name: string;
            labels: {
              singular: string;
              plural: string;
              list: string;
              create: string;
              edit: string;
              delete: string;
            };
            description: string;
            description_unformatted: string;
            description_structured: JSONContent;

            custom_meta_fields: ICustomMetaField[];
            related_taxonomies: Utils.Common.ID[];

            snapshots: IArticleTypeSnapshots;
            insights: IArticleTypeInsights;
          }
        }
      }
    }
  }
}
