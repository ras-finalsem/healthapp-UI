import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../services/symptoms.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  symptomsList: [{ID: number, Name: string}];
  filteredOptions: Observable<string[]>;
  selectedSymptoms: string[] = [];

  possibleDiagnosis: string[];

  constructor(private _symptomsService: SymptomsService) { }

  ngOnInit(): void {
    let that = this;
    this._symptomsService.getSymptomsList().subscribe(function(data) {
      that.symptomsList = data['body'];
      that.options = data['body'].map(item => item.Name);
      that.filteredOptions = that.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => that._filter(value))
        );
    });

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectSymptom(event) {
    const selectedSymptom = event.target.innerText.trim();
    this.selectedSymptoms.push(selectedSymptom);
    this.options.splice(this.options.indexOf(selectedSymptom), 1);
    this.myControl.setValue('');
    const selectedSymptomIds = this.symptomsList.filter(item => this.selectedSymptoms.indexOf(item.Name) > -1).map(item => item.ID);
    console.log("SymptomsComponent -> selectSymptom -> selectedSymptomIds", selectedSymptomIds);
    this._symptomsService.getIllnessForSymptoms(selectedSymptomIds, 1982, 'male').subscribe(data => {
      console.log("SymptomsComponent -> selectSymptom -> data", data);
      this.possibleDiagnosis = data['body'].map(item => item.Name);
    });
  }

  removeSymptom(symptom) {
    this.selectedSymptoms.splice(this.selectedSymptoms.indexOf(symptom), 1);
    this.options.push(symptom);
    this.myControl.setValue('');
    const selectedSymptomIds = this.symptomsList.filter(item => this.selectedSymptoms.indexOf(item.Name) > -1).map(item => item.ID);
    this._symptomsService.getIllnessForSymptoms(selectedSymptomIds, 1982, 'male').subscribe(data => {
      console.log("SymptomsComponent -> selectSymptom -> data", data);
      this.possibleDiagnosis = data['body'].map(item => item.Name);
    });
  }

}
