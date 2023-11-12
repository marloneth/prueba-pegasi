const { fakerES } = require('@faker-js/faker')
const { createLogger } = require('../src/config/logger')
const Appointment = require('../src/models/appointment')

function generateAppointmentData() {
  const nacimiento = fakerES.date.past({ years: 100 }).toISOString()
  const fallecido = fakerES.date
    .between({ from: nacimiento, to: new Date().toISOString() })
    .toISOString()

  return {
    nombre_completo: fakerES.person.fullName(),
    cedula: fakerES.string.alphanumeric({ length: 13 }),
    nacimiento,
    fallecido: fakerES.datatype.boolean({ probability: 0.3 })
      ? fallecido
      : null,
    ciudad_nacido: fakerES.location.city(),
    direccion_actual: fakerES.location.streetAddress(),
    correoActual: fakerES.internet.email(),
    a_t: fakerES.date.past(),
    UT: fakerES.date.past(),
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
