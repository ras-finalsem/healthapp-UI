import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component:  HomeComponent},
  {path: 'bookAppointment', component:  BookAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
