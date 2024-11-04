import { HttpStatusCode } from "./http.constants";


export const EXCEPTION_NAMES: {
  [Exception: string]: number;
} = {
  // System: 500
  'SYSTEM_ERROR': HttpStatusCode.INTERNAL_SERVER_ERROR,

  // Database: 500
  'DATABASE_ERROR': HttpStatusCode.INTERNAL_SERVER_ERROR,

  // Authentication: 401
  'UNAUTHORIZED': HttpStatusCode.UNAUTHORIZED,
  // Forbidden: 403
  'FORBIDDEN': HttpStatusCode.FORBIDDEN,

  // Validation: 400
  'VALIDATION_ERROR': HttpStatusCode.BAD_REQUEST,

  // Not Found: 404
  'NOT_FOUND': HttpStatusCode.NOT_FOUND,

  // Conflict: 409
  'CONFLICT': HttpStatusCode.CONFLICT,

  // External Service: 500
  'EXTERNAL_SERVICE_ERROR': HttpStatusCode.INTERNAL_SERVER_ERROR,

  // Custom Exceptions: 500
  'MY_CUSTOM_EXCEPTION': HttpStatusCode.INTERNAL_SERVER_ERROR,

  // Unknown: 500
  'UNKNOWN_ERROR': HttpStatusCode.INTERNAL_SERVER_ERROR,

  // No Content: 204
  'NO_CONTENT': HttpStatusCode.NO_CONTENT,

  // Bad Request: 400
  'BAD_REQUEST': HttpStatusCode.BAD_REQUEST,

  // Method Not Allowed: 405
  'METHOD_NOT_ALLOWED': HttpStatusCode.METHOD_NOT_ALLOWED,

  // Precondition Failed
  'PRECONDITION_FAILED': HttpStatusCode.PRECONDITION_FAILED,

  // Payload Too Large
  'PAYLOAD_TOO_LARGE': HttpStatusCode.PAYLOAD_TOO_LARGE,

  // Unsupported Media Type: 415
  'UNSUPPORTED_MEDIA_TYPE': HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,

  // Unprocessable Entity: 422
  'UNPROCESSABLE_ENTITY': HttpStatusCode.UNPROCESSABLE_ENTITY,

  // Rate Limit: 429
  'RATE_LIMIT_EXCEEDED': HttpStatusCode.TOO_MANY_REQUESTS,

  // Too Many Requests: 429
  'TOO_MANY_REQUESTS': HttpStatusCode.TOO_MANY_REQUESTS,

};

