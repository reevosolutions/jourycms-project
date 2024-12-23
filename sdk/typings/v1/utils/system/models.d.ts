declare module Levelup {
	namespace CMS {
		namespace V1 {
			namespace Utils {
				namespace SystemStructure {
					namespace Models {

						export type AuthModels =
							| "user"
							| "role"
							| "permission"
							| "permissionGroup"
							| "apiKey";

						export type CmModels =
							| "translationProject"
							| "translationNamespace"
							| "translationItem"
							| "taxonomy"
							| "term"
							| "review"
							| "comment"
							| "form"
							| "formEntry"
							| "article"
							| "articleType";
						export type SystemModels = "app";
						export type StorageModels = "uploadedFile";

						export type AllModels =
							| AuthModels
							| CmModels
							| StorageModels
							| SystemModels;

						/**
						 * TODO: finish this
						 */

						export type EntityType<E extends AllModels> =
							// auth
							E extends "user"
							? Levelup.CMS.V1.Users.Entity.ExposedUser &
							Record<"password" | "confirm_password", string>
							: E extends "permission"
							? Levelup.CMS.V1.Auth.Entity.Permission
							: E extends "permissionGroup"
							? Levelup.CMS.V1.Auth.Entity.PermissionGroup
							: E extends "role"
							? Levelup.CMS.V1.Auth.Entity.Role
							: E extends "apiKey"
							? Levelup.CMS.V1.Auth.Entity.ApiKey
							: // cm
							E extends "article"
							? Levelup.CMS.V1.Content.Entity.Article
							: E extends "articleType"
							? Levelup.CMS.V1.Content.Entity.ArticleType
							: E extends "review"
							? Levelup.CMS.V1.Content.Entity.Review
							: E extends "comment"
							? Levelup.CMS.V1.Content.Entity.Comment
							: E extends "term"
							? Levelup.CMS.V1.Content.Entity.Term
							: E extends "taxonomy"
							? Levelup.CMS.V1.Content.Entity.Taxonomy
							: E extends "translationItem"
							? Levelup.CMS.V1.Content.Translation.Entity.Item
							: E extends "translationProject"
							? Levelup.CMS.V1.Content.Translation.Entity.Project
							: E extends "translationNamespace"
							? Levelup.CMS.V1.Content.Translation.Entity.Namespace
							: E extends "form"
							? Levelup.CMS.V1.Content.Entity.Form
							: E extends "formEntry"
							? Levelup.CMS.V1.Content.Entity.FormEntry
							: // Storage
							E extends "uploadedFile"
							? Levelup.CMS.V1.Storage.Entity.UploadedFile
							: // system
							E extends "app"
							? Levelup.CMS.V1.System.Entity.App
							: never;
					}
				}
			}
		}
	}
}