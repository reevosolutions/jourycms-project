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
							? Levelup.V2.Users.Entity.ExposedUser &
							Record<"password" | "confirm_password", string>
							: E extends "permission"
							? Levelup.V2.Auth.Entity.Permission
							: E extends "permissionGroup"
							? Levelup.V2.Auth.Entity.PermissionGroup
							: E extends "role"
							? Levelup.V2.Auth.Entity.Role
							: E extends "apiKey"
							? Levelup.V2.Auth.Entity.ApiKey
							: // cm
							E extends "article"
							? Levelup.V2.Cm.Entity.Article
							: E extends "articleType"
							? Levelup.V2.Cm.Entity.ArticleType
							: E extends "review"
							? Levelup.V2.Cm.Entity.Review
							: E extends "comment"
							? Levelup.V2.Cm.Entity.Comment
							: E extends "term"
							? Levelup.V2.Cm.Entity.Term
							: E extends "taxonomy"
							? Levelup.V2.Cm.Entity.Taxonomy
							: E extends "translationItem"
							? Levelup.V2.Cm.Translation.Entity.Item
							: E extends "translationProject"
							? Levelup.V2.Cm.Translation.Entity.Project
							: E extends "translationNamespace"
							? Levelup.V2.Cm.Translation.Entity.Namespace
							: // Storage
							E extends "uploadedFile"
							? Levelup.V2.Storage.Entity.UploadedFile
							: // system
							E extends "app"
							? Levelup.V2.System.Entity.App
							: never;
					}
				}
			}
		}
	}
}