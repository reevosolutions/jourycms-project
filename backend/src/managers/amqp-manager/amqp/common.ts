export interface IQueueNameConfig {
  name: string;
  dlq: string;
  dlx: string;
}

export class DefaultQueueNameConfig implements IQueueNameConfig {
  public dlq: string;
  public dlx: string;
  public constructor(public name: string) {
    this.dlq = `${name}.DLQ`;
    this.dlx = `${this.dlq}.Exchange`
  }
}

export class DefaultPubSubQueueConfig implements IQueueNameConfig {
  public dlq: string;
  public dlx: string;

  public constructor(public name: string) {
    this.dlq = '';
    this.dlx = `${name}.DLQ.Exchange`
  }
}

export function asQueueNameConfig(config: IQueueNameConfig | string): IQueueNameConfig {
  return isQueueNameConfig(config) ? config : new DefaultQueueNameConfig(config);
}

export function asPubSubQueueNameConfig(config: IQueueNameConfig | string): IQueueNameConfig {
  return isQueueNameConfig(config) ? config : new DefaultPubSubQueueConfig(config);
}

function isQueueNameConfig(config: IQueueNameConfig | string): config is IQueueNameConfig {
  if ((config as IQueueNameConfig).name && (config as IQueueNameConfig).dlq && (config as IQueueNameConfig).dlx) {
    return true;
  }
}


export const LOG_PREFIX = '';