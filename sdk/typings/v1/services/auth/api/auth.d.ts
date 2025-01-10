declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Api {
          export namespace Auth {
            /**
             * --------------------------------------------------------------------------
             *                            Signup
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.Signup
             * @param {Levelup.CMS.V1.Auth.Api.Auth.Signup.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.Signup.Response}
             * @method POST
             *
             */
            export namespace Signup {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<{
                  account_type: 'agency' | 'doctor' | 'escort';
                  address: Utils.Entity.Snapshots.Locations.Address;
                  first_name: string;
                  family_name: string;
                  phones: string[];
                  website: string;
                  sex: Users.Entity.Sex | null;
                  email: string;
                  password: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  user: Users.Entity.User;
                  token: string;
                  refresh_token: string;
                }>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Signin
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.Signin
             * @param {Levelup.CMS.V1.Auth.Api.Auth.Signin.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.Signin.Response}
             * @method POST
             *
             */
            export namespace Signin {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<{
                  email: string;
                  password: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  user: Users.Entity.User;
                  token: string;
                  refresh_token: string;
                }>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangePassword
             * --------------------------------------------------------------------------
             * @link /change-password
             * @fires AuthService.ChangePassword
             * @param {Levelup.CMS.V1.Auth.Api.Auth.ChangePassword.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.ChangePassword.Response}
             * @method POST
             *
             */
            export namespace ChangePassword {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<{
                  old_password: string;
                  new_password: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  user: Users.Entity.User;
                  token: string;
                  refresh_token: string;
                }>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            RefreshToken
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.RefreshToken
             * @param {Levelup.CMS.V1.Auth.Api.Auth.RefreshToken.Request}
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.RefreshToken.Response}
             * @method POST
             */
            export namespace RefreshToken {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<{
                  refresh_token?: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  user: Users.Entity.User;
                  token: string;
                  refresh_token: string;
                }>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            SigninWithID
             * --------------------------------------------------------------------------
             * @method POST
             * @link /api/v2/auth/login-with-id
             * @fires AuthService.SigninWithId
             * @param {Levelup.CMS.V1.Auth.Api.Auth.SigninWithId.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.SigninWithId.Response}
             *
             */
            export namespace SigninWithId {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                user_id: Utils.Common.ID;
              }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  user?: Users.Entity.User;
                  token?: string;
                  refresh_token: string;
                }>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            SigninForPayment
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.SigninForPayment
             * @param {Levelup.CMS.V1.Auth.Api.Auth.SigninForPayment.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.SigninForPayment.Response}
             * @method POST
             *
             */
            export namespace SigninForPayment {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                password: string;
              }>;
              export type Response = Utils.Api.Response.DefaultResponse & {
                payment_token?: string;
              };
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdatePaymentPassword
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.UpdatePaymentPassword
             * @param {Levelup.CMS.V1.Auth.Api.Auth.UpdatePaymentPassword.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.UpdatePaymentPassword.Response}
             * @method PUT
             *
             */
            export namespace UpdatePaymentPassword {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                old_password: string;
                password: string;
              }>;
              export type Response = Utils.Api.Response.DefaultResponse & {
                payment_token?: string;
              };
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangeSellerPaymentPassword
             * --------------------------------------------------------------------------
             * @link
             * @fires AuthService.ChangeSellerPaymentPassword
             * @param {Levelup.CMS.V1.Auth.Api.Auth.ChangeSellerPaymentPassword.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Auth.ChangeSellerPaymentPassword.Response}
             * @method PUT
             *
             */
            export namespace ChangeSellerPaymentPassword {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                password: string;
              }>;
              export type Response = Utils.Api.Response.DefaultResponse & {
                data: Users.Entity.User;
              };
            }
            // end of request
          }
        }
      }
    }
  }
}
