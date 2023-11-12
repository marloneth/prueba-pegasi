const { createLogger } = require('../config/logger')
const { getFromExternalAPI } = require('../utils/api')
const Appointment = require('../models/appointment')
const { getMinuteOfTheDay } = require('../utils/date')
const { createAppointmentsDao } = require('../daos/appointment')

const logger = createLogger('/services/hbvAppointmentAdapter.js')

async function getHBVAppointments(filters, hoursOffset) {
  let url
  let baseURL
  let responseData
  const queryParams = new URLSearchParams(filters).toString()

  try {
    logger.info('Getting appointments from HBV API')
    baseURL = process.env.HBV_API_BASE_URL
    url = `${baseURL}/appointment`

    if (queryParams) url += `?${queryParams}`

    responseData = await getFromExternalAPI(url, {
      'x-hours-offset': hoursOffset,
    })

    return responseData.data.appointments
  } catch (error) {
    logger.error('Error on getHBVAppointments: ', error.message)
    throw error
  }
}

async function createAppointmentsFromHBVData(hbvAppointments) {
  try {
    logger.info('Creating new appointments from HBV Data')
    const appointmentsData = hbvAppointments.map((hbva) => {
      return new Appointment({
        paciente: {
          nombre: hbva.nombre_completo,
          dni: hbva.cedula,
          fechaNacimiento: hbva.nacimiento,
          fechaFachecimiento: hbva.fallecido,
          cidudadNacimiento: hbva.ciudad_nacido,
          fallecido: !!hbva.fallecido,
          direccion: hbva.direccion_actual,
          email: hbva.correoActual,
          casado: false,
        },
        integration: true,
        fechaRegistro: hbva.a_t,
        fechaInicio: getMinuteOfTheDay(new Date(hbva.a_t)),
        fechaFinal: getMinuteOfTheDay(new Date(hbva.UT)),
      })
    })

    const appointments = await createAppointmentsDao(appointmentsData)
    return appointments
  } catch (error) {
    logger.error('Error on createAppointmentsFromHBVData: ', error.message)
    throw error
  }
}

async function getHBVAppointmentsAndSave(filters, hoursOffset) {
  const hbvAppointments = await getHBVAppointments(filters, hoursOffset)
  const appointments = createAppointmentsFromHBVData(hbvAppointments)
  return appointments
}

module.exports = {
  getHBVAppointments,
  createAppointmentsFromHBVData,
  getHBVAppointmentsAndSave,
}
