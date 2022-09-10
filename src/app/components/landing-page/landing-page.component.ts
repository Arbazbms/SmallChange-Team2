import { Component, OnInit } from '@angular/core';

import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  clients : Client[]=[];
  constructor() { }

  ngOnInit(): void {
  

  }


}
