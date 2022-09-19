import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePageComponent } from './trade-page.component';

@Component({
  selector: 'app-trade-table',
  template: 'mock'
})
export class MockTradeTableComponent{}

@Component({
  selector: 'app-navbar',
  template: 'mock'
})
export class MockNavBarComponent{}

fdescribe('TradePageComponent', () => {
  let component: TradePageComponent;
  let fixture: ComponentFixture<TradePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradePageComponent, MockNavBarComponent, MockTradeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
