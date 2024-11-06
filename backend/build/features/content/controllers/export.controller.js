"use strict";
/**
 * @description this is shared file between all services .. it can be found in /controllers/export.controller.ts
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 09-03-2024 22:27:40
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typedi_1 = __importDefault(require("typedi"));
const exceptions_1 = __importDefault(require("../../../exceptions"));
const middlewares_1 = __importDefault(require("../../../middlewares"));
const export_manager_1 = __importDefault(require("../../../utilities/exporters/export.manager"));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const requests_1 = require("../../../utilities/requests");
const get_auth_data_1 = require("../../../utilities/requests/get-auth-data");
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 09-03-2024 22:28:11
 */
exports.default = (app) => {
    const logger = (0, logging_1.default)("CONTROLLER", "ExportController");
    const route = (0, express_1.Router)();
    app.use('/export', route);
    route.get('/items', middlewares_1.default.AUTH.requireUser, async (req, res, next) => {
        try {
            const exportManager = typedi_1.default.get(export_manager_1.default);
            /**
             * Always get the auth data at the beginning of the function
             */
            const AUTH_DATA = await (0, get_auth_data_1.getAuthData)(req);
            const result = await exportManager.list(req.query, AUTH_DATA);
            return (0, requests_1.respond)(res, result);
        }
        catch (e) {
            return next(e);
        }
    });
    route.get('/items/:id/file', middlewares_1.default.AUTH.requireUser, async (req, res, next) => {
        const { id } = req.params;
        try {
            const exportManager = typedi_1.default.get(export_manager_1.default);
            const doc = await exportManager.getById(id);
            if (!(doc === null || doc === void 0 ? void 0 : doc._id))
                throw new exceptions_1.default.ItemNotFoundException('DB document not found');
            const filename = path_1.default.join(__dirname, "../../exports", exportManager.generateExportFileName(doc));
            if (!fs_1.default.existsSync(filename))
                throw new exceptions_1.default.ItemNotFoundException('Excel file could not be found');
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=${exportManager.generateExportFileName(doc)}`);
            res.sendFile(filename);
        }
        catch (e) {
            return next(e);
        }
    });
};
//# sourceMappingURL=export.controller.js.map