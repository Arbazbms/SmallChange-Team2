import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TradeHist } from '../models/trade-hist';
import { TradeHistory } from '../services/tradeHistory.service';

import { ActivityComponent } from './activity.component';

@Component({
  selector: 'app-navbar',
  template: `<div></div>`,
 
})
class MockNavbarComponent  {};
describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;
  let tradeHist:any[];
  let mockTradeService: any = jasmine.createSpyObj('TradeHistory',
 ['getTradeHist']);
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ ActivityComponent,MockNavbarComponent ],
      imports:[DataTablesModule],
      providers: [
        { provide: TradeHistory, useValue: mockTradeService }
        ]




    })
    .compileComponents();
    tradeHist=[
      {
        "asset":"Equity",
        "side":"Buy",
        "security":"MSFT",
        "account":"ICICI",
        "qty":13,
        "cash":100,
        "date":"2022/5/3"
      },
      {
        "asset":"Fixed Income",
        "side":"Buy",
        "security":"Tesla",
        "account":"HDFC",
        "qty":15,
        "cash":200,
        "date":"2022/6/4"
      }];
      mockTradeService.getTradeHist.and.returnValue(of(tradeHist));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve tradeHist from the service', () => {
    expect(component.tradeHist.length).toBe(2);
    expect(component.tradeHist[0].asset).toBe('Equity');
    expect(component.tradeHist[1].asset)
    .toBe('Fixed Income');
   });

   it('should render each trade as a tr element',()=>{
    
   component.tradeHist=tradeHist;
    let actcomponentDEs= fixture.debugElement.query(By.css('tbody'));
    let trEle=actcomponentDEs.queryAll(By.css('tr'));
    expect(trEle.length).toEqual(2);
    expect(trEle[0].componentInstance.tradeHist[1].asset).toEqual('Fixed Income');
});
it('should contain a table', () => {
  const compiled = fixture.debugElement.nativeElement;
  const table = compiled.querySelector('table');
 
  expect(table.rows.length).toBe(3);
  expect(table.rows[1].cells[0].textContent)
 .toBe('Equity');
 });
});
