import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  location = {
    lat: 6.839231,
    lng: 79.981652,
    zoom: 12,
    marker: {
      lat: 6.839231,
      lng: 79.981652,
      draggable: true
    },
    keyword: null
  };

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition( pos => {
        this.location.lng = +pos.coords.longitude;
        this.location.lat = +pos.coords.latitude;
        this.location.marker.lng = this.location.lng;
        console.log(this.location.lng);
        console.log(this.location.lat);

    });
  }

  placeMarker($event) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.location.marker.lat = $event.coords.lat;
    this.location.marker.lng = $event.coords.lng;
    this.location.lat = this.location.marker.lat;
    this.location.lng = this.location.marker.lng;
  }

  keyup(){
    this.getUrl('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.location.marker.lat + ','+ this.location.marker.lng +'&radius=1500&keyword=' + this.location.keyword + '&key=AIzaSyDIMpYY2k6FMyXAK9T-t1677iXCUHan2h8', {}).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }
  search() {
    if (this.location.keyword == null || this.location.keyword === '' || this.location.keyword === ' ') {
      return ;
    }
    console.log(this.location.keyword);
    this.getUrl('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.location.marker.lat + ',' + this.location.marker.lng + '&address=' + this.location.keyword + '&key=AIzaSyDIMpYY2k6FMyXAK9T-t1677iXCUHan2h8', {}).subscribe(
      data => {
        this.searchHandler(data);
      },
      error => console.log(error)
    );
  }

  getUrl(url, headers) {
    return this.http.get(`${url}`, { headers: new HttpHeaders(headers) } );
  }

  searchHandler(data) {
    console.log(data)
    if (data.results[0]) {
      console.log(data.results[0]);
      this.location.zoom = 15;
      this.location.lat = data.results[0].geometry.location.lat;
      this.location.lng = data.results[0].geometry.location.lng;
      this.location.marker.lat = data.results[0].geometry.location.lat;
      this.location.marker.lng = data.results[0].geometry.location.lng;
    }
    console.log(this.location.lng);
        console.log(this.location.lat);
  }

  submit(){
    this.api.map(this.location.lat, this.location.lng).subscribe(
      data => {
        console.log(data);
        alert('success');
        this._router.navigate(['/dash']);
      },
      error => console.log(error)
    );
  }

}
