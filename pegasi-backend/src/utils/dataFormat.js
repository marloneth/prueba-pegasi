const moment = require('moment')

function formatAppointmentsData(appointments, today) {
  return appointments.map((appointment) => ({
    _id: appointment._id,
    patientName: appointment.paciente.nombre,
    patientAge: moment
      .utc(today)
      .diff(appointment.paciente.fechaNacimiento, 'years'),
    appointmentDate: appointment.fechaRegistro,
  }))
}

module.exports = {
  formatAppointmentsData,
}
