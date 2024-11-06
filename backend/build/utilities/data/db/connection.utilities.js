"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongooseUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getMongooseUri = () => {
    // Assuming you have already established a connection
    const conn = mongoose_1.default.connection;
    if (!conn) {
        return 'No active Mongoose connection';
    }
    const host = conn.host;
    const port = conn.port;
    const databaseName = conn.name;
    const user = conn.user;
    const pass = conn.pass; // Be careful with password, it's sensitive data
    // Constructing URI
    let uri = 'mongodb://';
    if (user && pass) {
        // uri += `${user}:${pass}@`;
    }
    uri += `${host}:${port}/${databaseName}`;
    return uri;
};
exports.getMongooseUri = getMongooseUri;
//# sourceMappingURL=connection.utilities.js.map