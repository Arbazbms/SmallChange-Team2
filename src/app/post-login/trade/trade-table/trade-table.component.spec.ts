import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Price } from 'src/app/models/price';
import { TradeService } from '../../services/trade.service';

import { TradeTableComponent } from './trade-table.component';

const mockInstruments: Price[] = [
  {
    instrumentId: 'AMZN',
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
];

describe('TradeTableComponent', () => {
  let component: TradeTableComponent;
  let fixture: ComponentFixture<TradeTableComponent>;

  beforeEach(async () => {
    const tradeService = jasmine.createSpyObj('TradeService', ['getAllInstruments']);
    tradeService.getAllInstruments.and.returnValue(of(mockInstruments));

    await TestBed.configureTestingModule({
      declarations: [ TradeTableComponent ],
      providers: [
        { provide: TradeService, useValue: tradeService }
    ]
    })
    .compileComponents();
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
    const table = compiled.querySelector('table');
    // console.log(table);
    expect(table.rows.length).toBe(2);
    expect(table.rows[0].cells[0].textContent).toBe('Symbol');
    expect(table.rows[1].cells[1].textContent).toBe('100');
});

});
