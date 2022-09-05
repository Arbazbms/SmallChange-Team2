import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  clients : Client[]=[];
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
      this.getClients();

  }
  getClients(): void {
    this.clientService.getClients()
        .subscribe(clients => this.clients = clients);
  }

}
