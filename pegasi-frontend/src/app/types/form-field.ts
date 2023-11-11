import { FormControl } from '@angular/forms'
import { InputType } from './input-type'

export interface FormField {
  id: string
  label: string
  control: FormControl
  type: InputType
}
