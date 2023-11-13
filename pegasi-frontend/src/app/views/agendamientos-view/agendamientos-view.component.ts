import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { FormField } from 'src/app/types/form-field'
import { PatientAppointment } from 'src/app/types/patient-appointment'
import { AppointmentService } from 'src/app/services/appointment.service'
import { AppointmentFilters } from 'src/app/types/appointment-filters'
import { removeInvalidProps } from 'src/app/utils/object'

@Component({
  selector: 'app-agendamientos-view',
  templateUrl: './agendamientos-view.component.html',
  styleUrls: ['./agendamientos-view.component.css'],
})
export class AgendamientosViewComponent implements OnInit {
  searchingForm = new FormGroup({
    patientFirstName: new FormControl(),
    patientLastName: new FormControl(),
    patientAge: new FormControl(),
    appointmentDate: new FormControl(),
  })

  formFields: FormField[] = [
    {
      id: 'patientFirstName',
      label: 'Nombre del paciente',
      control: this.searchingForm.controls['patientFirstName'] as FormControl,
      type: 'text',
    },
    {
      id: 'patientLastName',
      label: 'Apellido del paciente',
      control: this.searchingForm.controls['patientLastName'] as FormControl,
      type: 'text',
    },
    {
      id: 'patientAge',
      label: 'Edad del paciente',
      control: this.searchingForm.controls['patientAge'] as FormControl,
      type: 'number',
    },
    {
      id: 'appointmentDate',
      label: 'Fecha de la cita',
      control: this.searchingForm.controls['appointmentDate'] as FormControl,
      type: 'date',
    },
  ]

  requestSent = false
  responseDone = false
  errorMessage = ''
  dataSource: PatientAppointment[] = []
  displayedColumns: string[] = ['appointmentDate', 'patientName', 'patientAge']

  constructor(private appointmentService: AppointmentService) {}

  searchAppointments() {
    let filters: AppointmentFilters = {
      firstName: this.searchingForm.get('patientFirstName')?.value,
      lastName: this.searchingForm.get('patientLastName')?.value,
      age: this.searchingForm.get('patientAge')?.value,
      date: this.searchingForm.get('appointmentDate')?.value,
    }

    filters = removeInvalidProps(filters as Record<string, string>)

    this.errorMessage = ''
    this.requestSent = true
    this.responseDone = false
    this.dataSource = []

    this.appointmentService.getAppointments(filters).subscribe({
      next: (response) => {
        this.requestSent = false
        this.responseDone = true
        this.dataSource = response.data.appointments
      },
      error: (e) => {
        const errorReceived = e.error.message

        if (e.status === 500) {
          this.errorMessage = 'Algo salio mal. Intente mas tarde'
        } else {
          this.errorMessage = errorReceived
        }

        this.requestSent = false
        this.responseDone = true
      },
    })
  }

  ngOnInit(): void {}
}
