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
            has_work_address: boolean;
            work_address: Utils.Entity.Snapshots.Locations.Address | null;
            social_links?: {
              network: Utils.Common.SocialNetworks;
              url: string;
            }[];
          }

          export interface IUserPreferences {
            ui_mode?: UI.Mode;
            ui_language?: Levelup.V2.Cm.Translation.Entity.TLanguageCode;
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
            parcel_count: number;
            delivered_parcel_count: number;
            returned_parcel_count: number;
            delivered_parcel_percentage: number;
            returned_parcel_percentage: number;
            complaint_count: number;
            resolved_complaint_count: number;
            resolved_complaint_percentage: number;
            balance: number;
          }

          export interface IUserAttributes {
            is_suspended?: boolean;
            is_approved?: boolean;
            is_active?: boolean;
            inactive_since?: Date | null;

            nid?: string | null;
            driving_license_id?: string | null;
            started_at?: Date | null;

            multi_office_user?: {
              is_related_to_offices?: boolean;
              can_manage_all_offices?: boolean;
              subscribed_at_office?: Utils.Common.ID | null;
              managed_offices?: Utils.Common.ID[];
              last_managed_office?: Utils.Common.ID | null;
            } | null;

            seller?: {
              stores: Utils.Common.ID[];
              last_managed_store?: Utils.Common.ID;
            } | null;

            deliverer?: {
              countries?: Utils.Common.LocationAdministrativeCode[];
              states?: Utils.Common.LocationAdministrativeCode[];
              cities?: Utils.Common.LocationAdministrativeCode[];
              is_freelancer?: boolean;
              default_delivery_fees?: number;
              delivery_fees?: {
                city: {
                  country: Utils.Common.LocationAdministrativeCode;
                  state: Utils.Common.LocationAdministrativeCode;
                  city: Utils.Common.LocationAdministrativeCode;
                };
                is_default: boolean;
                fees: number;
              }[];
            } | null;

            team?: {
              has_team: boolean;
              team?: {
                leader: string;
                members: string[];
              };
            };
          }

          export interface IUserSnapshots {
            stores?: Utils.Entity.Snapshots.Accounts.Store[];
            company?: Utils.Entity.Snapshots.Accounts.Company;
            offices?: Utils.Entity.Snapshots.Logistics.Office[];
            team_leader?: Utils.Entity.Snapshots.Auth.User;
            team_members?: Utils.Entity.Snapshots.Auth.User[];
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
            deliverer_data?: IDelivererData;
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
