import { Injectable } from '@angular/core';
import { Clients } from 'src/app/models/mockAcctData';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  company : any= {
    "id" : 90,
    "Name" : "JP Morgan"
  }
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]>{
    const clients = of(Clients);
    return clients;
  }

  //demo
  getUsers = () => {
    return this.http.get('http://localhost:3000/companies')
  }

  postUser = () => {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    })
    this.http.post('http://localhost:3000/companies', JSON.stringify(this.company), {headers: headers}).subscribe(res => console.log("POST SUCESS", res))
  }
}
