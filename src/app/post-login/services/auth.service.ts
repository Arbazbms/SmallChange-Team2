import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean;

  constructor() { 
    this.isLoggedIn = false;
  }

  public IsLoggedIn(){
    console.log("isLoggedin: ", !!localStorage.getItem('client'), localStorage.getItem('client'))
    this.isLoggedIn = !!localStorage.getItem('client')
    return this.isLoggedIn;
  }

  public logout(){
    localStorage.setItem('client',"")
    this.isLoggedIn = !!localStorage.getItem('client')
  }
}
