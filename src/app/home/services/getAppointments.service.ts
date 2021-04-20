import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAppointmentService {

  constructor(private http: HttpClient) { }

  getAppointments(type) {
    // type = admin || doctor
    return this.http.get('http://localhost:5100/getAppointments');
  }

  confirmAppointment(data) {
    const {appointmentUUID, status} = data;
    return this.http.post('http://localhost:5100/confirmAppointment', {appointmentUUID, status});
  }
}
