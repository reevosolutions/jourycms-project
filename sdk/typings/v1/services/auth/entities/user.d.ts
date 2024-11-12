declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Users {
        export namespace Entity {
          export type Sex = "male" | "female";

          export interface IUserProfile {
            full_name?: string;
            first_name: string;
            family_name: string;
            sex: Sex | null;
            photo: Utils.Common.FileAttribute;
            phones: string[];
            website: string | null;
            address: Utils.Entity.Snapshots.Locations.Address;
            social_links?: {
              network: Utils.Common.SocialNetworks;
              url: string;
            }[];
          }

          export interface IUserPreferences {
            ui_mode?: UI.Mode;
            ui_language?: Levelup.CMS.V1.Content.Translation.Entity.TLanguageCode;
            printer_format?: Reports.Settings.PrinterFormat;
          }
          export interface IDelivererData {
            today_total_parcels?: {
              tracking_id: Utils.Common.TrackingID;
              amount: number;
            }[];
            today_delivered_parcels?: {
              tracking_id: Utils.Common.TrackingID;
              amount: number;
            }[];
            today_failed_parcels?: {
              tracking_id: Utils.Common.TrackingID;
              amount: number;
            }[];
          }

          export interface IUserInsights {
            last_updated: Date | null;
            rating: number;
          }

          export interface IUserAttributes {
            is_suspended?: boolean;
            is_approved?: boolean;
            is_active?: boolean;
            inactive_since?: Date | null;

            nid?: string | null;
            started_at?: Date | null;
            related_article?: string | null;
          }

          export interface IUserSnapshots {
          }

          export interface User
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            tracking_id: Utils.Common.TrackingID;
            //
            email: string;
            password?: string;
            salt?: string;
            role: Auth.Entity.TDefaultUserRoles | string;
            permissions: Utils.Common.ID[];
            permissions_other_than_role?: boolean;

            profile: IUserProfile;
            preferences?: IUserPreferences;
            attributes: IUserAttributes;
            snapshots?: IUserSnapshots;
            insights?: IUserInsights;
            auth_meta?: {
              last_login: Date | null;
              last_logout: Date | null;
              last_password_change: Date | null;
              last_password_reset: Date | null;
              last_password_reset_request: Date | null;
              password_reset_token: string | null;
              password_reset_token_expiration: Date | null;
              password_reset_token_used: boolean;
              password_reset_token_used_at: Date | null;
            } | null;
          }

          export type ExposedUser = Omit<User, "password" | "salt">;
        }
      }
    }
  }
}
