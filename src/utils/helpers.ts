import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

// Function to get current date
export const currentDate = (date: Date) => {
  return dayjs(date, "HH:mm");
}

// Function to calculate time duration
export const timeDuration = (currentTime: string, prayerTime: string) => {
  const currentHourDN = parseInt(currentTime.split(":")[0])
  const currentHourPT =  parseInt(prayerTime.split(":")[0])
  const currentMinuteDN = parseInt(currentTime.split(":")[1])
  const currentMinutePT =  parseInt(prayerTime.split(":")[1])
  let hoursDuration = 0
  let minutesDuration = 0

  // Calculate hours duration
  if (currentHourPT > currentHourDN) {
    hoursDuration = currentHourPT - currentHourDN
  } else {
    hoursDuration = currentHourDN - currentHourPT
  }

  // Calculate minutes duration
  if (currentMinutePT > currentMinuteDN) {
    minutesDuration = currentMinutePT - currentMinuteDN
  } else {
    minutesDuration = currentMinuteDN - currentMinutePT
  }

  // Return hours and minutes duration in one string
  return hoursDuration + " jam " + minutesDuration + " minit"
}