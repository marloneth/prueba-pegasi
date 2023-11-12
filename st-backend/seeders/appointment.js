const { faker } = require('@faker-js/faker')
const { createLogger } = require('../src/config/logger')
const Appointment = require('../src/models/appointment')

function generateAppointmentData() {
  const birthDate = faker.date.past({ years: 100 }).toISOString()
  const isDeceased = faker.datatype.boolean({ probability: 0.3 })
  const deceasedBirth = faker.date
    .between({ from: birthDate, to: new Date().toISOString() })
    .toISOString()

  return {
    name: faker.person.fullName(),
    identifier: faker.string.alphanumeric({ length: 13 }),
    birthDate,
    deceasedBirth: isDeceased ? deceasedBirth : null,
    birthCity: faker.location.city(),
    isDeceased,
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    married:
      birthDate.startsWith('19') &&
      faker.datatype.boolean({ probability: 0.5 }),
    integration: faker.datatype.boolean({ probability: 0.4 }),
    createdAt: faker.date.past(),
    updateAt: faker.datatype.boolean({ probability: 0.2 })
      ? faker.date.past()
      : null,
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
