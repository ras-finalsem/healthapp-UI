import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SymptomsModule } from './symptoms/symptoms.module';
import { BookAppointmentModule } from './book-appointment/book-appointment.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    BookAppointmentModule,
    SymptomsModule
  ],
  exports: []
})
export class HomeModule { }
