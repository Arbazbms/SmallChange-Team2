import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsLoggedIn(){
    console.log("isLoggedin: ", !!localStorage.getItem('client'))
    return !!localStorage.getItem('client');
  }
}
