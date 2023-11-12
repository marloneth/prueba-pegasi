const { fakerES } = require('@faker-js/faker')
const { createLogger } = require('../src/config/logger')
const Appointment = require('../src/models/appointment')

function generateAppointmentData() {
  const fechaNacimiento = fakerES.date.past({ years: 100 }).toISOString()
  const fallecido = fakerES.datatype.boolean({ probability: 0.3 })
  const fechaInicio = fakerES.number.int({ min: 0, max: 1330 })
  const fechaFachecimiento = fakerES.date
    .between({ from: fechaNacimiento, to: new Date().toISOString() })
    .toISOString()

  return {
    paciente: {
      nombre: fakerES.person.fullName(),
      dni: fakerES.string.alphanumeric({ length: 13 }),
      fechaNacimiento,
      fechaFachecimiento: fallecido ? fechaFachecimiento : null,
      cidudadNacimiento: fakerES.location.city(),
      fallecido,
      direccion: fakerES.location.streetAddress(),
      email: fakerES.internet.email(),
      casado:
        fechaNacimiento.startsWith('19') &&
        fakerES.datatype.boolean({ probability: 0.5 }),
    },
    integration: false,
    fechaRegistro: fakerES.date.past({ years: 2 }),
    fechaInicio,
    fechaFinal: fakerES.number.int({ min: fechaInicio, max: 1439 }),
  }
}

function generateManyAppointments(quantity) {
  return Array.from(new Array(quantity), () => generateAppointmentData())
}

async function populateAppointments() {
  const total = 100
  const logger = createLogger('appointment seeder')
  const appointments = generateManyAppointments(total)

  try {
    await Appointment.deleteMany({})
    logger.info('Appointment collection cleared')

    await Appointment.create(appointments)
    logger.info(`${total} appointments added`)
  } catch (error) {
    logger.error('Something went wrong: ', error)
  }
}

module.exports = {
  populateAppointments,
}
