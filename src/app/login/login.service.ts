import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(username: String, password: String) {
    return this.http.post('http://localhost:8080/login', {username, password})
  }
}
