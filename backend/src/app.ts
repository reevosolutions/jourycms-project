// it's important to extend String Prototype before any implementation
import './utilities/extend-prototypes';

import express from 'express';
import os from 'os';
// We need this in order to use @Decorators
import 'reflect-metadata';
import config from './config';
import loaders from './loaders';
import initLogger from './utilities/logging';


const logger = initLogger('APPLICATION', 'APP');

const totalCPUs = os.cpus().length;

const MAX_WORKERS = 4;

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(config.currentService.port, () => {
      console.log('');
      logger.success(`${config.currentService.name} Service listening on port: ${config.currentService.port} in env: ${process.env.NODE_ENV}`);
      console.log('');
    })
    .on('error', (err) => {
      console.log('');
      logger.error(`${config.currentService.name} System error in env: ${process.env.NODE_ENV}`, err);
      console.log('');
      process.exit(1);
    });
}

/**
 * 'beforeExit': Emitted when the Node.js process is about to exit due to no more work to do.
 */
process.on('beforeExit', () => {
  logger.warn('Node.js process is about to exit.');
});

/**
 * 'exit': Emitted when the Node.js process is about to exit. 
 * This event is not emitted for conditions that cause explicit termination, 
 * such as calling process.exit() or uncaught exceptions.
 */
process.on('exit', () => {
  logger.error(`${config.currentService.name} is exiting`, process.argv);
});

/**
 * 'uncaughtException': Emitted when an uncaught JavaScript exception bubbles all the way back to the event loop.
 */
process.on('uncaughtException', (error) => {
  logger.error(`${config.currentService.name} crashed due to uncaught exception`, error);
  // Optionally, you can exit the process if desired
  process.exit(1);
});

/**
 * 'unhandledRejection': Emitted when a Promise is rejected but there is no error handler to catch the rejection.
 */
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

/**
 * 'warning': Emitted when a warning occurs. 
 * This is typically triggered by using deprecated features.
 */
process.on('warning', (warning) => {
  logger.warn('Node.js process warning:', warning);
});

/**
 * 'message': Emitted when the child process uses process.send() to send messages.
 */
process.on('message', (message) => {
  logger.debug('Received message from parent process:', message);
});

/**
 * 'disconnect': Emitted after calling the .disconnect() method in the parent process.
 */
process.on('disconnect', () => {
  logger.event('Parent process manually disconnected.');
});

/**
 * 'SIGINT': Emitted when the process is interrupted with <Ctrl>+C.
 */
process.on('SIGINT', () => {
  logger.event('Received SIGINT signal. Exiting...');
  // Optionally, perform cleanup tasks before exiting
  process.exit();
});

/**
 * 'SIGTERM': Emitted when the process is terminated.
 */
process.on('SIGTERM', () => {
  logger.warn('Received SIGTERM signal. Exiting...');
  // Optionally, perform cleanup tasks before exiting
  process.exit();
});

/**
 * 'SIGBREAK': Emitted when the process is interrupted with <Ctrl>+Break.
 */
process.on('SIGBREAK', () => {
  logger.debug('Received SIGBREAK signal.');
});



startServer();
