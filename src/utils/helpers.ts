import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const currentDate = (date: Date) => {
  return dayjs(date, "HH:mm");
}

export const timeDuration = (currentTime: string, prayerTime: string) => {
  const currentHourDN = parseInt(currentTime.split(":")[0])
  const currentHourPT =  parseInt(prayerTime.split(":")[0])
  const currentMinuteDN = parseInt(currentTime.split(":")[1])
  const currentMinutePT =  parseInt(prayerTime.split(":")[1])
  let hoursDuration = 0
  let minutesDuration = 0

  if (currentHourPT > currentHourDN) {
    hoursDuration = currentHourPT - currentHourDN
  } else {
    hoursDuration = currentHourDN - currentHourPT
  }

  if (currentMinutePT > currentMinuteDN) {
    minutesDuration = currentMinutePT - currentMinuteDN
  } else {
    minutesDuration = currentMinuteDN - currentMinutePT
  }

  return hoursDuration + " hours " + minutesDuration + " minutes"
}