import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(path) {
    this.router.navigateByUrl(`/${path}`);
  }

  login() {
    console.log(this.username);
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    const test = "naveena";
    if(username && password) {
      if(username === test && password === test) {
        this.navigateTo('home');
      } else {
        alert("Login failed !");
      }
    } else {
      alert("username or password missing");
    }
  }

}
