import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from 'src/app/post-login/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  hamburger_clicked=false
  constructor(public authService: AuthService) { }
  hamburger_click(){
    this.hamburger_clicked=!(this.hamburger_clicked)
  }

}
