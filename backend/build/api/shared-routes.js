"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("../config"));
const exceptions_1 = require("../utilities/exceptions");
const system_1 = require("../utilities/system");
const logging_1 = __importDefault(require("../utilities/logging"));
// guaranteed to get dependencies
exports.default = () => {
    const logger = (0, logging_1.default)('CONTROLLER', 'shared');
    const app = (0, express_1.Router)();
    app.head('/', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    app.get('/', (req, res) => {
        res.status(200).json({
            service: config_1.default.currentService.name,
            server: 'UP'
        });
    });
    app.get('/status', (req, res) => {
        res.status(200).json({
            service: config_1.default.currentService.name,
            server: 'UP'
        });
    });
    app.get(config_1.default.http.api.prefix, (req, res) => {
        res.json({
            service: config_1.default.currentService.name,
            server: 'UP'
        });
    });
    app.get('/status/json', async (req, res) => {
        try {
            const status = await (0, system_1.getServerStatusReport)();
            logger.debug('server status', status);
            res.json(status);
        }
        catch (error) {
            res.json({
                service: config_1.default.currentService.name,
                server: 'UP',
                error: (0, exceptions_1.errorToObject)(error)
            });
        }
    });
    return app;
};
//# sourceMappingURL=shared-routes.js.map