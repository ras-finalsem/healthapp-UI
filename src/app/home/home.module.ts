import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [HomeComponent, BookAppointmentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserAnimationsModule
  ]
})
export class HomeModule { }
