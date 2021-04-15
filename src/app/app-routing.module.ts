import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component:  LoginComponent},
  {path: 'register', component:  RegisterComponent},
  {path: 'admin', component:  AdminComponent},
  {path: 'doctor', component:  DoctorComponent},
  {path: 'home/:username', component:  HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule,
    LoginModule,
    RegisterModule
    
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
