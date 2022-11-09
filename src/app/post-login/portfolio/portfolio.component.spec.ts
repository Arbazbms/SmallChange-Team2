import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTablesModule } from 'angular-datatables';


import { of } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Price } from 'src/app/models/price';
import { PortfolioService } from '../services/portfolio.service';


import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let testportfolio:any[]
  let testinstruments:any[]
  beforeEach(async () => {
    let testportfolio: Portfolio[] = [{
      portfolio_item_id: 'p1',
      client_id: 'h31',
      instrument_id: 'The Hobbit',
      trade_id: '1',
      quantity: 10,
      cost_price: 234,
      market_value: 424,
      gain: 190,
      ifgain: true,
      selected:false
    },
    {
      portfolio_item_id: 'p2',
      client_id: 'h31',
      instrument_id: 'The Hobbit',
      trade_id: '2',
      quantity: 100,
      cost_price: 234,
      market_value: 424,
      gain: 190,
      ifgain: true,
      selected:false
    }]
    let testinstruments: Price[] =[
    
      {
        instrumentId: 'The Hobbit',
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
      {
        instrumentId: 'A Wizard of Earthsea',
        bidPrice: 5,
        askPrice: 3,
        timeStamp: new Date('12/10/2006'),
        instrument: {
          instrumentId: 'DIS',
          instrumentDescription: 'Disney',
          externalIdType: 'ISIN',
          externalId: 'ISIN01682',
          categoryId: 'MainIndex',
          minQuantity: 2,
          maxQuantity: 39,
        },
      }]
    let portfolioService: any= jasmine.createSpyObj('PortfolioService',['getPortfolio','getInstrument','getAllInstruments']);
    portfolioService.getPortfolio.and.returnValue( of(testportfolio));
    portfolioService.getInstrument.and.returnValue( (testinstruments[1]));
    portfolioService.getAllInstruments.and.returnValue( of(testinstruments));
    // portfolioService.getInstrument.and.returnValue( of(testportfolio));
    await TestBed.configureTestingModule({

      declarations: [ PortfolioComponent ],
      imports:[DataTablesModule],
      providers: [{ provide: PortfolioService, useValue: portfolioService }]


    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrieve portfolio items from the service', () =>{
    expect(component.portfolios.length).toBe(2);
    expect(component.portfolios[0].portfolio_item_id).toBe('p1');
    expect(component.portfolios[1].portfolio_item_id).toBe('p2');
  });
  it('should retrieve curent items to sho sell tab from the service', () =>{
    component.displaySellTab('A Wizard of Earthsea',"2")
    expect(component.instrument.instrumentId).toBe('The Hobbit');
  });
});
