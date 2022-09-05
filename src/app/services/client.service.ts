import { Injectable } from '@angular/core';
import { Clients } from 'src/app/models/mockAcctData';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Observable<Client[]>{
    const clients = of(Clients);
    return clients;
  }

  
}
