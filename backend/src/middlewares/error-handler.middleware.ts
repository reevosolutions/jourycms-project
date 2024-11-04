import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import Joi from 'joi';
import mongoose from "mongoose";
import exceptions from "../exceptions";
import { errorToObject } from '../utilities/exceptions/index';
import initLogger from "../utilities/logging";

const logger = initLogger('MIDDLEWARE', 'errorHandler');

/**
 * 
 * @description Middleware to handle errors
 * TODO: Add logging, and check if the error is a LevelupException
 * @returns {NextFunction} The next function to be called
 */
const errorHandler = () => {
  return (err: Error | Levelup.V2.Utils.Api.Response.Error, req: Request, res: Response, next: NextFunction) => {

    // console.log('## Error handler middleware', err)


    /**
     * Handle 400 thrown by celebrate library
     */
    if (isCelebrateError(err)) {
      return res.status(400).json({
        error: {
          is_celebrate: true,
          message: err.message,
          name: err.name,
          status: 400,
          details: {
            body: err.details.get('body'),
            query: err.details.get('query'),
          },
          stack: process.env.NODE_ENV !== 'development' ? undefined : (err.stack as string)?.split('\n'),
        },
      }).end();
    }

    /**
     * Handle 110000 thrown by mongoose
     */
    if (err.name?.includes('Mongo') && (err as any).code === 11000) {
      err = new exceptions.ValueAlreadyExistsException(`Value(s) already exists`, Object.keys((err as any).keyValue || {}).reduce((acc, val) => {
        acc[val] = {
          value: (err as any).keyValue[val],
          message: `Value already exists`,
        }
        return acc;
      }, {} as Levelup.V2.Utils.Api.Response.ErrorFields));
      err['is_mongoose'] = true;
    }

    /**
     * Handle Mongoose validation error
     */
    if (err instanceof mongoose.Error.ValidationError) {
      const fields = Object.values(err.errors).reduce((acc: Levelup.V2.Utils.Api.Response.ErrorFields, val) => {
        acc[val.path] = {
          value: val.value,
          message: val.message,
        }
        return acc;
      }, {});
      err = new exceptions.ValidationException(err.message, fields);
      err['is_mongoose'] = true;
    }

    /**
     * Handle Joi.ValidationError
     */
    if (err instanceof Joi.ValidationError) {
      err = new exceptions.ValidationException(err.message, err);
      err['is_joi'] = true;
    }

    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      logger.warn('UnauthorizedError', err);
      return res.status((err as any).status || 401).json({
        error: {
          message: err.message,
          name: err.name,
          status: (err as any).status || 401,
          stack: process.env.NODE_ENV !== 'development' ? undefined : (err.stack as string)?.split('\n'),
        },
      }).end();
    }


    /**
     * Convert error to object
     */
    const error = errorToObject(err);

    /**
     * Remove stack trace in production
     */
    if (process.env.NODE_ENV !== 'development') {
      delete (error as Error).stack;
    }

    /**
     * Send the error response
     */
    res.status(typeof ((error as Levelup.V2.Utils.Api.Response.Error).status) === 'number' ? (error as Levelup.V2.Utils.Api.Response.Error).status : 500).json({
      error,
    }).end();

  }
}


export default errorHandler;

