import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  SymptomsService
} from '../services/symptoms.service';
import {
  FormControl
} from '@angular/forms';
import {
  Observable
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';


import * as mapboxgl from 'mapbox-gl';

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



  constructor(private _symptomsService: SymptomsService, private ngZone: NgZone) {}

  ngOnInit(): void {
    let that = this;
    this._symptomsService.getSymptomsList().subscribe(function (data) {
      that.symptomsList = data['body'];
      that.options = data['body'].map(item => item.Name);
      that.filteredOptions = that.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => that._filter(value))
        );
    });


    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoicmFzLWZpbmFsc2VtIiwiYSI6ImNraHJkYTJrYTA5dGQycW15MHZvdjN6ZjMifQ.S7HDKllzlrdjkmtMnfQCPg');
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    }); // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', function () {
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
              'features': [{
                  // feature for Mapbox DC
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [
                      -77.03238901390978,
                      38.913188059745586
                    ]
                  },
                  'properties': {
                    'title': 'Mapbox DC'
                  }
                },
                {
                  // feature for Mapbox SF
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [-122.414, 37.776]
                  },
                  'properties': {
                    'title': 'Mapbox SF'
                  }
                }
              ]
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
        }
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