import { PatientAppointment } from './patient-appointment'

export interface AppointmentResponse {
  status: 'success' | 'error'
  message: string
  data: {
    appointments: PatientAppointment[]
  }
}
