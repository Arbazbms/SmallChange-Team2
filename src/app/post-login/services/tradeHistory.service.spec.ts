import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { TradeHistory } from '../services/tradeHistory.service';

describe('TradeHistory Service', () => {
  let service: TradeHistory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeHistory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tradeHist', inject([TradeHistory],
    fakeAsync((service: TradeHistory) => {
    let tradeHists: any[] = [];
    service.getTradeHist()
    .subscribe(data => tradeHists = data);
    tick();
    expect(tradeHists).toBeTruthy();
    expect(tradeHists[0].asset).toBe('Equity');
   })));
});