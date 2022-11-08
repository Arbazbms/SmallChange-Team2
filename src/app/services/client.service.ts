import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  id:number = Math.random()
  company : any= {
    "id" : this.id,
    "Name" : "JP Morgan"
  }
  constructor(private http: HttpClient) { }


  addClient(client:Client){
    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    })
     this.http.post('http://localhost:3000/clients', JSON.stringify(client), {headers: headers})
     .subscribe(res => console.log("POST SUCESS", res))
    }
    getClients():Observable<any>{
      return (this.http.get('http://localhost:4000/clients'))
    }
  }
  //demo
//   getUsers = () => {
//     return this.http.get('http://localhost:3000/companies')
//   }

//   postUser = () => {
//     const headers = new HttpHeaders({
//       'Content-type' : 'application/json'
//     })
//     this.http.post('http://localhost:3000/companies', JSON.stringify(this.company), {headers: headers}).subscribe(res => console.log("POST SUCESS", res))
//   }
// 
