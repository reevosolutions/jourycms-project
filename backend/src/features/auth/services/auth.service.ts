import { Request } from 'express';
import Container, { Inject, Service } from 'typedi';
import events from '../../../config/events.config';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import AuthManager from '../../../managers/auth-manager';
import CacheManager from '../../../managers/cache-manager';
import { createTrackingId } from '../../../utilities/system/tracking-id.utilities';
import { mapUserToExposed } from '../mappers/user.mappers';
import BaseService from './../../../common/base.service';
import { buildUserFullName } from '../../../utilities/strings';

import EntityAlias = Levelup.CMS.V1.Users.Entity.User;
import AuthValidators from '../validators/auth.validators';
import { mapDocumentToExposed } from '../../../common/mappers/general.mappers';
/**
 * @description You can not inject typedi dependencies here because it's loaded before registering them
 */
@Service()
export default class AuthService extends BaseService {
  authManager: AuthManager;

  constructor(
    @Inject('userModel') private userModel: Levelup.CMS.V1.Users.Model.User,
    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
    this.authManager = Container.get(AuthManager);
  }
  async register(
    { data }: Levelup.CMS.V1.Auth.Api.Auth.Signup.Request,
    authData?: Levelup.CMS.V1.Security.AuthData
  ): Promise<Levelup.CMS.V1.Auth.Api.Auth.Signup.Response> {
    try {
      /**
       * Validate the request body
       */
      const { error } = AuthValidators.validateRegisterBody(data);
      if (error) throw error;


      const { email } = data;
      const oldUserDoc = await this.userModel.findOne({ email }).exec();

      if (oldUserDoc) {
        throw new exceptions.ValueAlreadyExistsException('Email already exists', {
          email: {
            value: email,
            message: 'Email already exists'
          }
        });
      }

      const { salt, password } = await this.authManager.hashPassword(data.password);
      const tracking_id = await createTrackingId('user', this.userModel as any);
      const userObject: Partial<EntityAlias> = {
        profile: {
          first_name: data.first_name,
          family_name: data.family_name,
          full_name: buildUserFullName(data),
          sex: data.sex,
          photo: {
            id: '',
            url: ''
          },
          phones: [],
          website: data.website,
          address: data.address,
        },
        attributes: {
        },
        permissions: [],
        email: data.email,
        app: authData?.current?.app?._id || null,
        role: data.account_type || 'user',
        tracking_id,
        salt,
        password
      }
      const doc = await this.userModel.create({
        ...userObject
      } as any);
      this.logger.silly('Generating JWT');
      const payload: Levelup.CMS.V1.Security.JWTUserAuthPayload = {
        _id: doc._id.toString(),
        tracking_id: doc.tracking_id,
        role: doc.role,
        space: 'default'
      };
      const token = this.authManager.generateToken(payload, 'default', false);
      const refresh_token = this.authManager.generateToken(payload, 'default', true);

      if (!doc) {
        throw new exceptions.InternalServerError('User cannot be created');
      }

      // dispatch event
      this.eventDispatcher.dispatch<Levelup.CMS.V1.Events.Payloads.Auth.register>(events.auth.auth.register, {
        data: mapUserToExposed(doc.toObject(), {
          omitAuthMeta: false
        })
      });

      // return result
      return {
        data: {
          user: mapUserToExposed(doc.toObject()),
          token,
          refresh_token
        }
      };
    } catch (error) {
      this.logError(this.register, error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<Levelup.CMS.V1.Auth.Api.Auth.Signin.Response> {
    try {
      const { error } = AuthValidators.validateLoginBody({ email, password });
      if (error) throw error;

      const doc = await this.userModel.findOne({ email, is_deleted: false });
      if (!doc) throw new exceptions.UnauthorizedException('User not found');

      if (doc.attributes.is_suspended) throw new exceptions.UnauthorizedException('User suspended');

      const isValidPassword = await this.authManager.verifyPassword(password, doc.password);
      if (!isValidPassword) throw new exceptions.UnauthorizedException('Invalid password');

      const payload: Levelup.CMS.V1.Security.JWTUserAuthPayload = {
        _id: doc._id.toString(),
        tracking_id: doc.tracking_id,
        role: doc.role,
        space: 'default'
      };
      const token = this.authManager.generateToken(payload, 'default', false);
      const refresh_token = this.authManager.generateToken(payload, 'default', true);

      doc.auth_meta.last_login = new Date();
      try {
        await doc.save();
      } catch (error) {
        this.logger.error(this.login.name, error);
      }

      // dispatch event
      this.eventDispatcher.dispatch<Levelup.CMS.V1.Events.Payloads.Auth.login>(events.auth.auth.login, {
        data: mapDocumentToExposed(doc)
      });

      // return result
      return {
        data: {
          user: mapUserToExposed(doc.toObject()),
          token,
          refresh_token
        }
      };
    } catch (error) {
      this.logError(this.login, error);
      throw error;
    }
  }

  public async logout(req: Request) {
    try {
      const cache = Container.get(CacheManager);
      const token = req.headers['authorization']?.split(' ')[1];
      if (token) {
        const decodedToken = this.authManager.decodeToken(token);
        if (decodedToken) {
          cache.users.unset(decodedToken._id);
        }
        const doc = await this.userModel.findByIdAndUpdate(
          decodedToken._id,
          {
            $set: {
              'auth_meta.last_logout': new Date()
            }
          },
          { new: true }
        );

        // dispatch event
        this.eventDispatcher.dispatch<Levelup.CMS.V1.Events.Payloads.Auth.logout>(events.auth.auth.logout, {
          data: mapDocumentToExposed(doc)
        });
      }
    } catch (error) {
      this.logError(this.logout, error);
      throw error;
    }
  }

  public async changePassword(
    { data }: Levelup.CMS.V1.Auth.Api.Auth.ChangePassword.Request,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<Levelup.CMS.V1.Auth.Api.Auth.RefreshToken.Response> {
    try {
      if (!data?.old_password) throw new exceptions.UnprocessableEntityException('Old password is required');
      if (!data?.new_password) throw new exceptions.UnprocessableEntityException('New password is required');

      const doc = await this.userModel.findOne({ _id: authData.current.user._id, is_deleted: false });
      if (!doc) throw new exceptions.UnauthorizedException('User not found');
      if (doc.attributes.is_suspended) throw new exceptions.UnauthorizedException('User suspended');

      const isValidPassword = await this.authManager.verifyPassword(data.old_password, doc.password);
      if (!isValidPassword) throw new exceptions.UnauthorizedException('Invalid password');

      const { salt, password } = await this.authManager.hashPassword(data.new_password);
      doc.salt = salt;
      doc.password = password;
      await doc.save();

      const payload: Levelup.CMS.V1.Security.JWTUserAuthPayload = {
        _id: doc._id.toString(),
        tracking_id: doc.tracking_id,
        role: doc.role,
        space: 'default'
      };
      const token = this.authManager.generateToken(payload, 'default', false);
      const refresh_token = this.authManager.generateToken(payload, 'default', true);

      // dispatch event
      this.eventDispatcher.dispatch<Levelup.CMS.V1.Events.Payloads.Auth.login>(events.auth.auth.login, {
        data: mapDocumentToExposed(doc)
      });
      return {
        data: {
          user: mapUserToExposed(doc.toObject()),
          token,
          refresh_token
        }
      };
    } catch (error) {
      this.logError(this.refreshToken, error);
      throw error;
    }
  }

  public async refreshToken(
    { data }: Levelup.CMS.V1.Auth.Api.Auth.RefreshToken.Request,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<Levelup.CMS.V1.Auth.Api.Auth.RefreshToken.Response> {
    try {
      if (!data?.refresh_token) throw new exceptions.UnprocessableEntityException('Refresh token is required');

      const decodedToken = this.authManager.decodeToken(data.refresh_token);
      if (decodedToken) {
        const payload = decodedToken;
        if (authData.current?.user?._id && payload._id !== authData.current.user._id)
          throw new exceptions.UnauthorizedException('Invalid refresh token');
        const token = this.authManager.generateToken(payload, payload.space || 'default', false);
        const refresh_token = this.authManager.generateToken(payload, payload.space || 'default', true);

        const doc = await this.userModel.findOne({ _id: payload._id, is_deleted: false });
        if (!doc) throw new exceptions.UnauthorizedException('User not found');
        if (doc.attributes.is_suspended) throw new exceptions.UnauthorizedException('User suspended');

        return {
          data: {
            user: mapUserToExposed(doc.toObject()),
            token,
            refresh_token
          }
        };
      }
      throw new exceptions.UnauthorizedException('Invalid refresh token');
    } catch (error) {
      this.logError(this.refreshToken, error);
      throw error;
    }
  }

  // Example method for revoking a token
  revokeToken(token: string): void {
    // Implement your token revocation logic here
    // This could involve invalidating the token or adding it to a blacklist
  }

  // Example method for password reset
  resetPassword(username: string, newPassword: string): void {
    // Implement your password reset logic here
    // This could involve updating the user's password in the database
  }

  // Example method for user authentication
  authenticateUser(username: string, password: string) {
    // Implement your authentication logic here
    // Return true if the user is authenticated, false otherwise
  }
}
