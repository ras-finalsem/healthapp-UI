import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
