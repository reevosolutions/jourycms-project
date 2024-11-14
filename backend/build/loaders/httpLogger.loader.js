"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../config"));
exports.default = ({ app }) => {
    // app.use(morgan(
    //   ':method :url :status :res[content-length] - :response-time ms',
    //   {
    //     stream: {
    //       // Configure Morgan to use our custom logger with the http severity
    //       write: (message) => LoggerInstance.http(message.trim()),
    //     },
    //   }
    // ));
    app.use((req, res, next) => {
        const httpRequest = {
            method: req.method,
            path: req.path,
            service: config_1.default.currentService.name.toLowerCase(),
            query: req.query,
            body: req.body,
            ip: req.ip,
            headers: req.headers
        };
        next();
        if (httpRequest.service !== "log" && httpRequest.service !== "gateway") {
            // log(req as any, {
            //   service: httpRequest.service,
            //   name: "HTTP",
            //   type: "http",
            //   severity: "info",
            //   payload: httpRequest,
            // }, config.levelup.log)
            // console.log(colors.magenta("REQUEST"), httpRequest);
        }
    });
    app.use((0, morgan_1.default)('dev'));
};
//# sourceMappingURL=httpLogger.loader.js.map