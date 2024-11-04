/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
import axios, { AxiosError } from "axios";
import Joi from "joi";
import exceptions from "../../exceptions";

/**
 * TODO: Implement this function
 * @param error
 * @param status number
 * @param statusText string
 * @returns Error
 */
export const generateErrorFromHttpException = (
  error: Levelup.V2.Utils.Api.Response.Error,
  status: number,
  statusText: string
) => {
  return new Error(`Error: ${status} - ${statusText} - ${error.message}`);
};

export const errorToObject = (
  error:
    | typeof exceptions.LevelupException
    | Joi.ValidationError
    | Error
    | AxiosError
    | Levelup.V2.Utils.Api.Response.Error
): Levelup.V2.Utils.Api.Response.ErrorObject | undefined => {
  if (!error) return error as any;
  if (axios.isAxiosError(error)) {
    const status = error.status ? error.status : error.code || 500;
    const code = error.code;
    const message = error.message;
    const name = error.name;
    const headers = error.response?.headers as any;
    const data = error.response?.data;
    const baseURL = error.config?.baseURL;
    const url = error.config?.url;
    const method = error.config?.method;
    const params = error.config?.params;
    const body = error.config?.data;
    const stack =
      typeof error.stack === "string" ? error.stack.split("\n") : error.stack;
    return {
      is_axios: true,
      status,
      code,
      message,
      name,
      headers,
      data,
      baseURL,
      url,
      method,
      params,
      body,
      stack,
    };
  } else if (error instanceof Joi.ValidationError) {
    return {
      name: error.name,
      message: error.message,
      status: 422,
      code: 422,
      is_joi: true,
      fields: error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = {
          value: curr.context.value,
          error: curr.message,
        };
        return acc;
      }, {}),
      stack:
        typeof error.stack === "string" ? error.stack.split("\n") : error.stack,
    };
  } else {
    const message = (error as any).message as string;
    const stack = (error as any).stack as string | string[];
    return {
      is_joi: (error as any).is_joi || undefined,
      is_mongoose: (error as any).is_mongoose || undefined,
      is_celebrate: (error as any).is_celebrate || undefined,
      name: error.name,
      message: message,
      status: (error as any).status || 500,
      code: (error as any).code,
      errors: (error as any).errors,
      fields: (error as any).fields,
      stack: typeof stack === "string" ? stack.split("\n") : stack,
    };
  }
};
