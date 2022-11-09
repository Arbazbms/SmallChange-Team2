import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {HttpTestingController,HttpClientTestingModule} from '@angular/common/http/testing'

import { ClientService } from './client.service';
import { Client } from '../models/client.model';
import { Identification } from '../models/identification.model';

describe('ClientService', () => {
  let httpTestingController: HttpTestingController;
  const testclients: Client[] = []
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        // HttpTestingController
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should POST to add a client', inject([ClientService],fakeAsync((service: ClientService) =>{
    const expected = new Client('test1','test1','testbla','test1blbla','','',[new Identification('','')],'');
    service.addClient(expected);
    const req = httpTestingController.expectOne('http://localhost:3000/clients');
    // Assert that the request is a POST.
    expect(req.request.method).toEqual('POST');
    // Assert that it was called with the right data
    expect(req.request.body).toBe(JSON.stringify(expected));
    // Respond with empty 
    req.flush(null);
    // Assert that there are no outstanding requests.
    httpTestingController.verify();
  tick();
})));
});
