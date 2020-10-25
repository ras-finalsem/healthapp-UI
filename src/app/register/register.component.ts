import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  @ViewChild('confirmPassword') confirmPassword;

  constructor(private router: Router, private _registerService: RegisterService) { }

  ngOnInit(): void {
  }

  navigateTo(path) {
    this.router.navigateByUrl(`/${path}`);
  }

  register() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    const confirmPassword = this.confirmPassword.nativeElement.value;

    if(username && password && confirmPassword) {
      console.log("all things exist");
      if(password === confirmPassword) {
        console.log("Register");
        this._registerService.registerUser(username, password).subscribe((data) => {
          alert(data['message'])
        })
      } else {
        console.log("Passwords don't match");
      }
    }
  }

}
