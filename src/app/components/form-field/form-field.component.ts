import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { InputType } from 'src/app/types/input-type'

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
})
export class FormFieldComponent implements OnInit {
  @Input() id = ''
  @Input() label = ''
  @Input() type: InputType = 'text'
  @Input() control: FormControl = new FormControl()

  constructor() {}

  ngOnInit(): void {}
}
