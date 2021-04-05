import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {

  constructor(private http: HttpClient) { }

  bookAppointment(appointmentData) {
    console.log("appointmentData: ", appointmentData);
    return this.http.post('http://localhost:5100/bookAppointment', {...appointmentData, status: "pending"}).subscribe(response => {
      console.log("bookAppoint response: ", response)
    });
  }
}
