import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const currentDate = (date: date) => {
  return dayjs(date, "HH:mm");
}