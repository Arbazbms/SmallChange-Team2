import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TradeTransactionComponent } from './trade-transaction.component';
import { of } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Price } from 'src/app/models/price';
import { PortfolioService } from '../../services/portfolio.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('TradeTransactionComponent', () => {
  let component: TradeTransactionComponent;
  let fixture: ComponentFixture<TradeTransactionComponent>;
  let testportfolio:any[]
  let testinstruments:any[]
  let httpTestingController: HttpTestingController;
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
    
    await TestBed.configureTestingModule({
      declarations: [TradeTransactionComponent],
      imports: [
        DialogModule,
        SliderModule,
        ToastModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [{ provide: PortfolioService, useValue: portfolioService }]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.inject(HttpTestingController);
    
    fixture = TestBed.createComponent(TradeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit values', () => {
    spyOn(component.soldAllStocks, 'emit');
    spyOn(component.showModalEvent, 'emit');
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelectorAll('button')[1];
    button.dispatchEvent(new Event('click'));
    console.log(button);
    
    expect(component.soldAllStocks.emit).toHaveBeenCalled();
    expect(component.showModalEvent.emit).toHaveBeenCalled();
  });
});
