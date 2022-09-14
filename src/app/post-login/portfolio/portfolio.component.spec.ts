import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTablesModule } from 'angular-datatables';

import { of } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from '../services/portfolio.service';

import { PortfolioComponent } from './portfolio.component';
// import "datatables.net";
@Component({
  selector: 'app-navbar',
  template: `<div></div>`,

})
class MockNavbarComponent  {};
describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let testportfolio:any[]
  let testinstruments:any[]
  beforeEach(async () => {
    testportfolio=[{
      instrument: 'Amazon',
      instrumentid: 'The Hobbit',
      orderid: '1',
      costprice: 234,
      marketprice: 424,
      gain: 190,
      ifgain: true,
      selected:false
    },
    {
      instrument: 'Ford',
      instrumentid: 'A Wizard of Earthsea',
      orderid: '2',
      costprice: 234,
      marketprice: 24,
      gain: -210,
      ifgain: false,
      selected: false,
    }]
    testinstruments=[
    
      {
        instrumentId: 'The Hobbit',
        bidPrice: 100,
        askPrice: 200,
        timeStamp: new Date('12/10/2006'),
        instrument: {
          instrumentId: 'AMZN',
          description: 'Amazon.com',
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
          description: 'Disney',
          externalIdType: 'ISIN',
          externalId: 'ISIN01682',
          categoryId: 'MainIndex',
          minQuantity: 2,
          maxQuantity: 39,
        },
      }]
    let portfolioService: any= jasmine.createSpyObj('PortfolioService',['getPortfolio','getInstrument']);
    portfolioService.getPortfolio.and.returnValue( of(testportfolio));
    portfolioService.getInstrument.and.returnValue( (testinstruments[1]));
    // portfolioService.getInstrument.and.returnValue( of(testportfolio));
    await TestBed.configureTestingModule({
      declarations: [ PortfolioComponent,MockNavbarComponent ],
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
    expect(component.portfolio.length).toBe(2);
    expect(component.portfolio[0].instrumentid).toBe('The Hobbit');
    expect(component.portfolio[1].instrumentid).toBe('A Wizard of Earthsea');
  });
  it('should retrieve curent items to show sell tab from the service', () =>{
    component.displaySellTab('A Wizard of Earthsea',1)
    expect(component.instrument.instrumentId).toBe('A Wizard of Earthsea');
  });
});
