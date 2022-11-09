import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { TradeService } from './trade.service';
import { Instrument } from 'src/app/models/instrument';
import { Price } from 'src/app/models/price';

const mockInstruments: Price[] = [
  {
    instrumentId: 'AMZN',
    bidPrice: 100,
    askPrice: 200,
    timeStamp: new Date('12/10/2006'),
    instrument: {
      instrumentId: 'AMZN',
      instrumentDescription: 'Amazon.com',
      externalIdType: 'ISIN',
      externalId: 'ISIN14577',
      categoryId: 'MainIndex',
      minQuantity: 10,
      maxQuantity: 130,
    },
  },
];
describe('TradeService', () => {
  let service: TradeService;
  let httpTestingController: HttpTestingController;
  let serviceUrl = 'http://localhost:3000/fmts/trades/prices';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



it('should return instrument details', inject([TradeService], fakeAsync((service: TradeService) => {
    let price: Price[] = [];
    service.getAllInstruments()
        .subscribe(data => price = data);
    const req = httpTestingController.expectOne(serviceUrl);
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with mock data, causing Observable to resolve.
    // Return something different. This turns a single Car into Car[].
    req.flush([mockInstruments[0]]);
    // Assert that there are no outstanding requests.
    httpTestingController.verify();
    // Cause all Observables to complete and check the results
    tick();
    expect(price).toBeTruthy();
    expect(price[0].instrumentId).toBe('AMZN');
})));

});
