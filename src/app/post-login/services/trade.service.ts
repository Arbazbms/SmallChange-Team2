import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeModel } from 'src/app/models/trade-model';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  cashBalance: number = 1000000;
  baseUrl: string = 'http://localhost:3000/';
  tradeRef = 3463256445;
  intrumentDetails: TradeModel[] = [];
  price: Price = new Price('',-1, -1,new Date(),new Instrument('', '', '', '', '', -1, -1));
  tradeModel: TradeModel = new TradeModel('', '', -1, -1, -1);
  priceDetails: Price[] = [];

  constructor(private http: HttpClient) {}

  getInstruments(): TradeModel[] {
    this.http.get<Price[]>(this.baseUrl + 'price').subscribe((data) => {
      this.priceDetails = data;
    });
    this.priceDetails.forEach((price) => {
      this.tradeModel.instrumentId = price.instrumentId;
      this.tradeModel.description = price.instrument.description;
      this.tradeModel.minQuantity = price.instrument.minQuantity;
      this.tradeModel.maxQuantity = price.instrument.maxQuantity;
      this.tradeModel.targetPrice = price.askPrice;
      this.intrumentDetails.push(this.tradeModel);
    });
    return this.intrumentDetails;
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
