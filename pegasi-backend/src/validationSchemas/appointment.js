const Joi = require('joi')
const { age, date, personName } = require('../utils/regex')

const getAppointmentsQuerySchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(personName)
    .message('Nombre del paciente no es valido')
    .label('firstName'),
  lastName: Joi.string()
    .regex(personName)
    .message('Apellido del paciente no es valido')
    .label('firstName'),
  age: Joi.string()
    .regex(age)
    .message('Edad del paciente no es valida')
    .label('age'),
  date: Joi.string()
    .regex(date)
    .message('Fecha de la cita debe estar en el siguiente formato: AAAA-MM-DD')
    .label('date'),
  externalResource: Joi.string().valid('ST', 'HBV').label('externalResource'),
})

module.exports = {
  getAppointmentsQuerySchema,
}
