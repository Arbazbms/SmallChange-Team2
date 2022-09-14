import { TestBed } from '@angular/core/testing';
import { Portfolio } from 'src/app/models/portfolio.model';

import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should  send entire portfolio', () => {
    var expected:Portfolio[]
    service.getPortfolio().subscribe(data=>{expected=data
    expect(expected[0].instrument).toBe('Amazon')}
      )
  });
  it('should  send one instrument', () => {
    var expected:any
    expected=service.getInstrument('AMZN')
    
    expect(expected.bidPrice).toBe(100)
    expect(expected.askPrice).toBe(200)
      
  });
});
