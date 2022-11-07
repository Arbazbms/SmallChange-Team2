import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeModel } from 'src/app/models/trade-model';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  cashBalance: number = 1000000;
  baseUrl: string = 'http://localhost:4000/';
  tradeRef = 3463256445;
  intrumentDetails: TradeModel[] = [];
  price: Price = new Price('',-1, -1,new Date(),new Instrument('', '', '', '', '', -1, -1));
  priceDetails: Price[] = [];

  constructor(private http: HttpClient) {}

  getAllInstruments() : Observable<Price[]>{
    return this.http.get<Price[]>(this.baseUrl+'price')
  }


  placeOrder(order: Order): number {
    if (this.checkCash()) {
      this.http.post(this.baseUrl + 'order', order).subscribe();
      this.cashBalance = this.cashBalance - order.targetPrice;
      return this.tradeRef++;
    }
    return 0;
  }

  /* Define Function */
  checkCash(): boolean {
    return true;
  }
}
