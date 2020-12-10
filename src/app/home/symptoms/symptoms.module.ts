import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SymptomsComponent } from './symptoms.component';
import { SymptomsService } from '../services/symptoms.service';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [SymptomsComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GoogleMapsModule
  ],
  exports: [SymptomsComponent],
  providers: [SymptomsService]
})
export class SymptomsModule { }
