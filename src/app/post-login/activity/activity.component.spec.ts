import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { of } from 'rxjs';
import { TradeHist } from '../models/trade-hist';
import { TradeService } from '../services/trade.service';
import { TradeHistory } from '../services/tradeHistory.service';

import { ActivityComponent } from './activity.component';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;
  let mockTrade: any[];
  let httpTestingController: HttpTestingController;
  let mockTradeService: any = jasmine.createSpyObj('TradeService', ['getAllTradeHistory',]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityComponent],
      imports: [DataTablesModule],
      providers: [{ provide: TradeService, useValue: mockTradeService }],
    }).compileComponents();
  
    mockTrade = [
      {
          "instrumentId": "C100",
          "quantity": 100,
          "executionPrice": 9542,
          "direction": "S",
          "clientId": "h31",
          "tradeId": "e5a33f3b-c63f-4438-a9bb-bdd76efa9d3f",
          "cashValue": 9552,
          "orderId": "14f67db8-c7ac-494f-95e5-4cd77154b63f",
          "order": {
              "instrumentId": "C100",
              "quantity": 100,
              "targetPrice": 9542,
              "direction": "S",
              "clientId": "h31",
              "orderId": "14f67db8-c7ac-494f-95e5-4cd77154b63f",
              "dateTime": "2022-11-08T20:51:10.006Z"
          }
      },
      {
          "instrumentId": "N123456",
          "quantity": 228,
          "executionPrice": 23769,
          "direction": "B",
          "clientId": "h31",
          "tradeId": "9ebb555d-76fa-416a-9247-22e83f040949",
          "cashValue": 23779,
          "orderId": "f2269714-74d7-4f9c-aced-d35e4ba81136",
          "order": {
              "instrumentId": "N123456",
              "quantity": 228,
              "targetPrice": 23769,
              "direction": "B",
              "clientId": "h31",
              "orderId": "f2269714-74d7-4f9c-aced-d35e4ba81136",
              "dateTime": "2022-11-08T22:56:28.993Z"
          }
      },
    ]
    mockTradeService.getAllTradeHistory.and.returnValue(of(mockTrade));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should retrieve tradeHist from the service', () => {
  //   expect(component.trade.length).toBe(2);
  //   expect(component.trade[0].instrumentId).toBe('C100');
  //   expect(component.trade[1].instrumentId).toBe('N123456');
  // });

  // it('should render each trade as a tr element', () => {
  //   component.tradeHist = tradeHist;
  //   let actcomponentDEs = fixture.debugElement.query(By.css('tbody'));
  //   let trEle = actcomponentDEs.queryAll(By.css('tr'));
  //   expect(trEle.length).toEqual(2);
  //   expect(trEle[0].componentInstance.tradeHist[1].asset).toEqual(
  //     'Fixed Income'
  //   );
  // });
  // it('should contain a table', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   const table = compiled.querySelector('table');

  //   expect(table.rows.length).toBe(3);
  //   expect(table.rows[1].cells[0].textContent).toBe('Equity');
  // });
});
