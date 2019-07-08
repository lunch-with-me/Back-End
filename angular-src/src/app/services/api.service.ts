import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient, private auth:AuthService) { }

  host = 'http://localhost:8080/';

  map(lat, lon){
    console.log(lat);
    return this._http.get(this.host + 'users/locationAdd/' + this.auth.getUserData()['user']['id'] + '?lng=' + lon + '&lat='+lat,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}
