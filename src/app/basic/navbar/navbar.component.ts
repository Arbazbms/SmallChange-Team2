import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  hamburger_clicked=false
  constructor() { }
  hamburger_click(){
    this.hamburger_clicked=!(this.hamburger_clicked)
  }

}
