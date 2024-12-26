declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Entity {
          export interface IFromSnapshots {
            created_by: Utils.Entity.Snapshots.Auth.User | null;
          }
          
          export interface IFromInsights {
            entry_count?: number;
          }
          
          export interface IFormSettings {
            has_reset_button?: boolean;
            reset_button_label?: string;
            has_submit_button?: boolean;
            submit_button_label?: string;
            shown_fields_on_dashboard?: string[];
          }

          export interface Form
            extends Utils.Entity.General.ICreatable,
            Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            slug: string;
            name: string;
            description: string;
            description_unformatted: string;
            description_structured: { [Key: string]: any };
            is_published: boolean;
            published_at: Date | null;
            fields: ICustomMetaField[];
            insights: IFromInsights;
            snapshots: IFromSnapshots;
            settings: IFormSettings;
          }
        }
      }
    }
  }
}
