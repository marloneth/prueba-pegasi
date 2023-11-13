function getMinuteOfTheDay(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return hours * 60 + minutes
}

function getDatePart(date) {
  return date.toISOString().split('T')[0]
}

module.exports = {
  getMinuteOfTheDay,
  getDatePart,
}
