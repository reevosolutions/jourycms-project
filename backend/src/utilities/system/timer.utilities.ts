import { millisecondsToTimeString } from "../date/time.utilities";

export class Timer {
  private starting: number;
  public constructor() {
    this.starting = new Date().getTime();
  }

  /**
   * return milliseconds ago
   */
  public get time() {
    return new Date().getTime() - this.starting;
  }

  public get timeString() {
    return millisecondsToTimeString(new Date().getTime() - this.starting);
  }
}
export const initTimer = () => new Timer();

export const delay = (ms: number) => {
  return new Promise<null>((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
};

export const sleep = delay;
