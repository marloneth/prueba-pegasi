import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { AppointmentResponse } from '../types/appointment-response'
import { AppointmentFilters } from '../types/appointment-filters'

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  getAppointments(
    filters: AppointmentFilters = {}
  ): Observable<AppointmentResponse> {
    let url = `${this.baseUrl}/appointment`
    const hoursOffset = (new Date().getTimezoneOffset() / 60) * -1
    const queryParams = new URLSearchParams({ ...filters }).toString()

    if (queryParams) url += `?${queryParams}`

    return this.http.get<AppointmentResponse>(url, {
      headers: new HttpHeaders({
        'x-hours-offset': hoursOffset.toString(),
      }),
    })
  }
}
