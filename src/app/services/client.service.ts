import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  id:number = Math.random()
  company : any= {
    "id" : this.id,
    "Name" : "JP Morgan"
  }
  url: string = 'http://localhost:8080/client'
  constructor(private http: HttpClient) { }

  // Handle Api Error
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
     
       console.error('An error occurred:', error.error.message);
     } else {
    
     console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
   
    } 
    return throwError(() => 'Unable to contact service; please try again later.'); 
   
   };


  addClient(client:Client):Observable<Client>{

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    })
    
      console.log('SENDING CLIENT OBJ : ', client);
      return this.http.post<Client>(this.url + '/register', JSON.stringify(client), {headers: headers}).pipe(catchError(this.handleError));

   
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
