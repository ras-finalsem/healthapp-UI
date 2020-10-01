import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(username: String, password: String) {
    return this.http.post('https://8c8cba94acaf.ngrok.io/register', {username, password})
  }
}
