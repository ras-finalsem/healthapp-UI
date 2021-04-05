import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(username: String, password: String, userType: String) {
    return this.http.post('http://localhost:5100/register', {username, password, userType})
  }
}
