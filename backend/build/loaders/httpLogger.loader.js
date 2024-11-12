import morgan from 'morgan';
import config from '../config';
export default ({ app }) => {
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
            service: config.currentService.name.toLowerCase(),
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
    app.use(morgan('dev'));
};
//# sourceMappingURL=httpLogger.loader.js.map