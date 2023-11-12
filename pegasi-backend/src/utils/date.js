function getMinuteOfTheDay(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return hours * 60 + minutes
}

module.exports = {
  getMinuteOfTheDay,
}
