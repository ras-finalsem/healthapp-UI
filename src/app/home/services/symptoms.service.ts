import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private http: HttpClient) { }

  getSymptomsList() {
    return this.http.get('http://localhost:8080/illnessesList');
  }

  getIllnessForSymptoms(symptomIDs, yearOfBirth, gender) {
    return this.http.post('http://localhost:8080/getIllness', {symptomIDs, yearOfBirth, gender});
  }
}
