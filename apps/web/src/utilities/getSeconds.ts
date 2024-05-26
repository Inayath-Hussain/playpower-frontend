import dayjs from "dayjs"
import utcPlugin from "dayjs/plugin/utc";

export const getSeconds = (unixTime: number, offset: number) => {
    dayjs.extend(utcPlugin)
    const obj = dayjs(unixTime).utcOffset(offset)
    return (obj.hour() * 60 * 60) + (obj.minute() * 60);
}