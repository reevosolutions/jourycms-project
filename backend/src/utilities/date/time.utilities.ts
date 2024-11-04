import { addLeadingZeros } from "../strings";


export const millisecondsToTimeString = (milli: number) => {
  const milliseconds = milli % 1000;
  const seconds = Math.floor((milli / 1000) % 60);
  const minutes = Math.floor((milli / (60 * 1000)) % 60);
  const hours = Math.floor((milli / (60 * 60 * 1000)) % 60);

  return hours ?
    addLeadingZeros(hours, 2) + ":" + addLeadingZeros(minutes, 2) + ":" + addLeadingZeros(seconds, 2) + "." + addLeadingZeros(milliseconds, 3)
    : minutes ?
      addLeadingZeros(minutes, 2) + ":" + addLeadingZeros(seconds, 2) + "." + addLeadingZeros(milliseconds, 3)
      : addLeadingZeros(seconds, 2) + "." + addLeadingZeros(milliseconds, 3)

}






/**
 * @since 02-12-2023 15:38:10
 */
export function getSecondsDifference(endDate: Date, startDate: Date): number {
  // Convert dates to milliseconds since Unix epoch
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = endTime - startTime;

  // Convert milliseconds to seconds
  const differenceInSeconds = differenceInMilliseconds / 1000;

  return differenceInSeconds;
}

