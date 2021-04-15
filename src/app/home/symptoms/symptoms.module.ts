import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogOverviewExampleDialog, SymptomsComponent } from './symptoms.component';
import { SymptomsService } from '../services/symptoms.service';
import { MapBoxAPIService } from '../services/mapboxAPI.service';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { GoogleMapsModule } from '@angular/google-maps'
import { BookAppointmentService } from '../services/bookAppointment.service';


@NgModule({
  declarations: [SymptomsComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GoogleMapsModule
  ],
  exports: [SymptomsComponent, DialogOverviewExampleDialog],
  providers: [SymptomsService, MapBoxAPIService, BookAppointmentService]
})
export class SymptomsModule { }
