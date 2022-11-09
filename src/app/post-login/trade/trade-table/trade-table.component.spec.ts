import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeService } from '../../services/trade.service';

import { TradeTableComponent } from './trade-table.component';

@Component({
  selector: 'app-trade-transaction',
  template: 'mock'
})
export class MockAppTradeTransaction{
  @Input() instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  @Input() order: Order = new Order('',-1,-1,'','','',new Date())
  @Output() showModalEvent = new EventEmitter()
}

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

describe('TradeTableComponent', () => {
  let component: TradeTableComponent;
  let fixture: ComponentFixture<TradeTableComponent>;

  beforeEach(async () => {
    const tradeService = jasmine.createSpyObj('TradeService', [
      'getAllInstruments',
    ]);
    tradeService.getAllInstruments.and.returnValue(of(mockInstruments));

    await TestBed.configureTestingModule({
      declarations: [TradeTableComponent, MockAppTradeTransaction],
      imports: [TableModule],
      providers: [{ provide: TradeService, useValue: tradeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('p-table')
    expect(table).toBeTruthy()
    // expect(table).toBe(2);
    // expect(table.rows[0].cells[0].textContent).toBe('Symbol');
    // expect(table.rows[1].cells[1].textContent).toBe('100');
  });


  
});
