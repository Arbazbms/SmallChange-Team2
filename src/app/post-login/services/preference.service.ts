import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Preference } from 'src/app/models/preference';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  url:string = "http://localhost:4000/preferences"

  constructor(private http: HttpClient) { }


  //handle Error
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it.
       console.error('An error occurred:', error.error.message);
     } else {
    // The backend returned an unsuccessful response code.
     // The response body may contain clues
     
     console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
   
    } // return an observable with a user-facing error message
    return throwError(() => 'Unable to contact service; please try again later.'); 
   };



  headers = new HttpHeaders({
    'Content-type' : 'application/json'
  })


  savePreferences(prefObj:Preference):Observable<Preference[]>{
   return this.http.post<Preference[]>(this.url, JSON.stringify(prefObj),  {headers: this.headers})
  }

  getPreferenceById(id:string) {
    return this.http.get(this.url+ '/' +id).pipe(catchError(this.handleError))
  } 

  updatePreference(id:any, data:any):Observable<Preference>{
    return this.http.put<Preference>(this.url+ '/' +id, JSON.stringify(data), {headers:this.headers})
  }
}

