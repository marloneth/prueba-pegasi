const { createLogger } = require('../config/logger')
const { getFromExternalAPI } = require('../utils/api')
const Appointment = require('../models/appointment')
const { getMinuteOfTheDay } = require('../utils/date')
const { createAppointmentsDao } = require('../daos/appointment')

const logger = createLogger('/services/stAppointmentAdapter.js')

async function getSTAppointments(filters, hoursOffset) {
  let url
  let baseURL
  let responseData
  const queryParams = new URLSearchParams(filters).toString()

  try {
    logger.info('Getting appointments from ST API')
    baseURL = process.env.ST_API_BASE_URL
    url = `${baseURL}/appointment`

    if (queryParams) url += `?${queryParams}`

    responseData = await getFromExternalAPI(url, {
      'x-hours-offset': hoursOffset,
    })

    return responseData.data.appointments
  } catch (error) {
    logger.error('Error on getSTAppointments: ', error.message)
    throw error
  }
}

async function createAppointmentsFromSTData(stAppointments) {
  try {
    logger.info('Creating new appointments from ST Data')
    const appointmentsData = stAppointments.map((sta) => {
      return new Appointment({
        paciente: {
          nombre: sta.name,
          dni: sta.identifier,
          fechaNacimiento: sta.birthDate,
          fechaFachecimiento: sta.deceasedBirth,
          cidudadNacimiento: sta.birthCity,
          fallecido: sta.isDeceased,
          direccion: sta.address,
          email: sta.email,
          casado: sta.married,
        },
        integration: true,
        fechaRegistro: sta.createdAt,
        fechaInicio: getMinuteOfTheDay(new Date(sta.createdAt)),
        fechaFinal: getMinuteOfTheDay(new Date(sta.updateAt)),
      })
    })

    const appointments = await createAppointmentsDao(appointmentsData)
    return appointments
  } catch (error) {
    logger.error('Error on createAppointmentsFromSTData: ', error.message)
    throw error
  }
}

async function getSTAppointmentsAndSave(filters, hoursOffset) {
  const stAppointments = await getSTAppointments(filters, hoursOffset)
  const appointments = createAppointmentsFromSTData(stAppointments)
  return appointments
}

module.exports = {
  getSTAppointments,
  createAppointmentsFromSTData,
  getSTAppointmentsAndSave,
}
