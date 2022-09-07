import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  url:string = "http://localhost:3000/preferences"

  constructor(private http: HttpClient) { }


  headers = new HttpHeaders({
    'Content-type' : 'application/json'
  })


  savePreferences = (prefObj:any) => {
    this.http.post<any>(this.url, JSON.stringify(prefObj),  {headers: this.headers}).subscribe(res => console.log("POST PREF SUCESS", res))
  }
}
