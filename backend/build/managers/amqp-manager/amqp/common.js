"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_PREFIX = exports.DefaultPubSubQueueConfig = exports.DefaultQueueNameConfig = void 0;
exports.asQueueNameConfig = asQueueNameConfig;
exports.asPubSubQueueNameConfig = asPubSubQueueNameConfig;
class DefaultQueueNameConfig {
    constructor(name) {
        this.name = name;
        this.dlq = `${name}.DLQ`;
        this.dlx = `${this.dlq}.Exchange`;
    }
}
exports.DefaultQueueNameConfig = DefaultQueueNameConfig;
class DefaultPubSubQueueConfig {
    constructor(name) {
        this.name = name;
        this.dlq = '';
        this.dlx = `${name}.DLQ.Exchange`;
    }
}
exports.DefaultPubSubQueueConfig = DefaultPubSubQueueConfig;
function asQueueNameConfig(config) {
    return isQueueNameConfig(config) ? config : new DefaultQueueNameConfig(config);
}
function asPubSubQueueNameConfig(config) {
    return isQueueNameConfig(config) ? config : new DefaultPubSubQueueConfig(config);
}
function isQueueNameConfig(config) {
    if (config.name && config.dlq && config.dlx) {
        return true;
    }
}
exports.LOG_PREFIX = '';
//# sourceMappingURL=common.js.map