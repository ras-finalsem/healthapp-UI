import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  @ViewChild('userType') userType;

  constructor(private router: Router, private _loginService: LoginService) {}

  ngOnInit(): void {}

  navigateTo(path, username?) {
    const url = path + (username ? `/${username}` : '');
    this.router.navigateByUrl(url);
  }

  login() {
    console.log(this.username);
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    const userType = this.userType.nativeElement.value;
    const that = this;
    if (username && password) {
      this._loginService.loginUser(username, password).subscribe(function (data) {
        if (data && data['message']) {
          switch (data['message']) {
            case 'success':
              if(userType === "Admin" ) window.location.href = "admin";
              if(userType === "Doctor" ) window.location.href = "doctor";
              that.navigateTo('home', username);
              break;
            default:
              alert(data['message']);
              break;
          }
        } else {
          alert("this should not have happened");
        }
      });
    } else {
      alert("username or password missing");
    }
  }

}