import BaseClient from '../../../base.client';

import SDK = Levelup.CMS.V1.SDK;

// import ServiceAlias = Levelup.CMS.V1.Auth;
import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth;


export default class AuthClient extends BaseClient {


  constructor(container: SDK.IServiceContainer) {
    super(container, '/auth');
  }


  async register(params: ApiAlias.Signup.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Signup.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/register'), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  async login(params: ApiAlias.Signin.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Signin.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/login'), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }
  async changePassword(params: ApiAlias.ChangePassword.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.ChangePassword.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/change-password'), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }

  async logout(): Promise<SDK.TResponseDatum<ApiAlias.Signin.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/logout'));
  }

  async refreshToken(params: ApiAlias.RefreshToken.Request, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.RefreshToken.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/refresh-token'), params, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }
  async authenticateAsAnotherUser(user_id: string, config?: SDK.TRequestConfig): Promise<SDK.TResponseDatum<ApiAlias.Signin.Response>> {
    return await this.container.sdk.httpClient.post(this.generatePrefix('/authenticate-as-another-user'), {
      data: {
        user_id
      }
    }, {
      headers: this.container.sdk.generateHeadersFromRequestConfig(config)
    });
  }
}