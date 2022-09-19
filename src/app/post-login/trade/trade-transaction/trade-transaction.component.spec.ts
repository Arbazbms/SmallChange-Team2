import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TradeTransactionComponent } from './trade-transaction.component';

describe('TradeTransactionComponent', () => {
  let component: TradeTransactionComponent;
  let fixture: ComponentFixture<TradeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeTransactionComponent],
      imports: [
        DialogModule,
        SliderModule,
        ToastModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
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
