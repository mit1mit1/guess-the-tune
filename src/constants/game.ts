import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const userTimezone = dayjs.tz.guess();
const dawnOfFirstDay = dayjs.tz("2022-05-31 00:00", userTimezone);
export const maxAvailableArchiveSongs = dayjs()
  .tz(userTimezone)
  .diff(dawnOfFirstDay, "days");
