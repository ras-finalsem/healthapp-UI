import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  Inject,
  Input
} from '@angular/core';
import {
  SymptomsService
} from '../services/symptoms.service';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';

import {
  MapBoxAPIService
} from '../services/mapboxAPI.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import * as mapboxgl from 'mapbox-gl';
import {
  BookAppointmentService
} from '../services/bookAppointment.service';

import {MatSnackBar} from '@angular/material/snack-bar';
export interface DialogData {
  name: string;
  selectedSymptoms: Array < any > ;
}

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss']
})
export class SymptomsComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  symptomsList: [{
    ID: number,
    Name: string
  }];
  filteredOptions: Observable < string[] > ;
  selectedSymptoms: string[] = [];

  possibleDiagnosis: string[];

  title = 'My first AGM project';


  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 38.913188059745586;
  lng = -77.03238901390978;

  @ViewChild('search', {
    static: true
  })
  searchElementRef: ElementRef;

  @Input() username: string = "";

  showHosp = false;

  constructor(private _symptomsService: SymptomsService, private ngZone: NgZone, private _MapBoxAPIService: MapBoxAPIService, public dialog: MatDialog) {}

  ngOnInit(): void {
    let that = this;
    this._symptomsService.getSymptomsList().subscribe((data) => {
      that.symptomsList = data['body'];
      that.options = data['body'].map(item => item.Name);
      that.filteredOptions = that.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => that._filter(value))
        );
    });
  }
  
  showHospitals() {
    this.showHosp = true;
    this.getLocation()
    // intialize location services
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initializeMapBox(position)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  initializeMapBox(position) {
    // const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude;
    const latitude = 42.3086;
    const longitude = -83.4821;

    const bbox = {
      latitude,
      longitude,
      minLatitude: latitude - 0.5,
      maxLatitude: latitude + 0.5,
      minLongitude: longitude - 0.5,
      maxLongitude: longitude + 0.5,
    };

    console.log(latitude, longitude);

    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoicmFzLWZpbmFsc2VtIiwiYSI6ImNraHJkYTJrYTA5dGQycW15MHZvdjN6ZjMifQ.S7HDKllzlrdjkmtMnfQCPg');
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13,
      center: [longitude, latitude]
    }); // Add map controls



    var marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map)

    this.map.addControl(new mapboxgl.NavigationControl());
    const that = this;
    this._MapBoxAPIService.getPlacesBBOX(bbox).subscribe((listOfHospitals: any) => {

      const {
        features
      } = listOfHospitals;

      this.map.on('load', function () {
        console.log("Adding marker");

        // Add an image to use as a custom marker
        that.map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          function (error, image) {
            if (error) throw error;
            that.map.addImage('custom-marker', image);
            // Add a GeoJSON source with 2 points
            that.map.addSource('points', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': features
              }
            });

            // Add a symbol layer
            that.map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'points',
              'layout': {
                'icon-image': 'custom-marker',
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': [
                  'Open Sans Semibold',
                  'Arial Unicode MS Bold'
                ],
                'text-offset': [0, 1.25],
                'text-anchor': 'top'
              }
            });


            that.map.on('click', 'points', function (e: any) {
              var coordinates = e.features[0].geometry.coordinates.slice();
              var description = e.features[0].properties.description;

              const selectedHospital = features.filter(hospital => parseFloat(hospital.center[0].toFixed(4)) === parseFloat(coordinates[0].toFixed(4)))[0];

              console.log(selectedHospital, that.selectedSymptoms);

              const dialogRef = that.dialog.open(DialogOverviewExampleDialog, {
                width: '20vw',
                height: '40vh',
                data: {
                  username: that.username,
                  name: selectedHospital.text,
                  selectedSymptoms: that.selectedSymptoms
                }
              });
            });
          }
        );
      });
    })
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

  
    logout() {
      window.location.href='login';
    }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './book-appointment.component.html',
})
export class DialogOverviewExampleDialog {
  @ViewChild('appointmentDate') appointmentDate: ElementRef;

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef < DialogOverviewExampleDialog > , @Inject(MAT_DIALOG_DATA) public data: DialogData, private _bookAppointmentService: BookAppointmentService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  bookAppointment() {
    this._bookAppointmentService.bookAppointment({
      date: this.appointmentDate.nativeElement.value,
      ...this.data
    });
    this.dialogRef.close();
    this._snackBar.open("Appointment request sent !", "OK", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }


}
