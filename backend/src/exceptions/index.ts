import BadRequestException from "./bad-request.exception";
import UnprocessableEntityException from "./unprocessable-entity.exception";
import InvalidPasswordException from "./invalid-password.exception";
import ItemNotFoundException from "./item-not-found.exception";
import NoItemsFoundException from "./no-items-found.exception";
import NoContentException from "./no-content.exception";
import UnauthorizedException from "./unauthorized-error.exception";
import ValueAlreadyExistsException from "./value-already-exists.exception";
import LevelupException from "./levelup-exception.exception";
import InternalServerError from "./internal-server-error.exception";
import ValidationException from "./validation.exception";
import JWTTokenExpired from "./jwt-token-expired.exception";

const exceptions = {
  /**
   * @description This exception is the base exception for all exceptions in the application
   */
  LevelupException,
  /**
   * code: 500
   */
  InternalServerError,
  /**
   * code: 400
   */
  BadRequestException,
  /**
   * code: 422
   */
  ValidationException,
  /**
   * code: 422
   */
  UnprocessableEntityException,
  /**
   * code: 422
   */
  InvalidPasswordException,
  /**
   * code: 404
   */
  ItemNotFoundException,
  /**
   * code: 404
   */
  NoItemsFoundException,
  NotFoundException: NoItemsFoundException,
  /**
   * code: 401
   */
  UnauthorizedException,
  /**
   * code: 401
   */
  JWTTokenExpired,
  /**
   * code: 409
   */
  ValueAlreadyExistsException,

  /**
   * @description This exception is used when the request is valid but the server has nothing to send back.
   * - it's used when an event is received and the service has nothing to do with it
   * - status code: 204
   */
  NoContentException,
};
export default exceptions;
