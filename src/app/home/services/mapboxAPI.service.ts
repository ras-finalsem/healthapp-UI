import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapBoxAPIService {

  constructor(private http: HttpClient) { }

  getPlacesBBOX(bbox) {
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospitals.json?proximity=${bbox.longitude},${bbox.latitude}&bbox=${bbox.minLongitude},${bbox.minLatitude},${bbox.maxLongitude},${bbox.maxLatitude}&limit=10&access_token=pk.eyJ1IjoicmFzLWZpbmFsc2VtIiwiYSI6ImNraHJkYTJrYTA5dGQycW15MHZvdjN6ZjMifQ.S7HDKllzlrdjkmtMnfQCPg`);
  }
}
