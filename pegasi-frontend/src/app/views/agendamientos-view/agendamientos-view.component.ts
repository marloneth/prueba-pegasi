import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { FormField } from 'src/app/types/form-field'
import { patientsList } from 'src/app/mock/patientsList'
import { PatientAppointment } from 'src/app/types/patient-appointment'

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
  dataSource: PatientAppointment[] = []
  displayedColumns: string[] = [
    'appointmentDate',
    'patientFullName',
    'patientAge',
  ]

  constructor() {}

  searchAppointments() {
    this.dataSource = []
    this.requestSent = true
    setTimeout(() => {
      this.dataSource = patientsList
    }, 3000)
  }

  ngOnInit(): void {}
}
