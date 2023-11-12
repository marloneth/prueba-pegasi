const Joi = require('joi')
const { age, date } = require('../utils/regex')

const getAppointmentsQuerySchema = Joi.object().keys({
  firstName: Joi.string().label('firstName'),
  lastName: Joi.string().label('firstName'),
  age: Joi.string()
    .regex(age)
    .message('given age is not logic for a human')
    .label('age'),
  date: Joi.string()
    .regex(date)
    .message("given date should have this format: 'YYYY-MM-DD'")
    .label('date'),
})

module.exports = {
  getAppointmentsQuerySchema,
}
