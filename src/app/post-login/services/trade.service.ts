import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { Trade } from 'src/app/models/trade';
import { TradeModel } from 'src/app/models/trade-model';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  cashBalance: number = 1000000;
  //dbUrl: string = 'http://localhost:8080/trades'
  baseUrl: string = 'http://localhost:4000/';
  fmtsUrl: string = 'http://localhost:3000/fmts/trades/'
  tradeRef = 3463256445;
  intrumentDetails: TradeModel[] = [];
  price: Price = new Price('',-1, -1,new Date(),new Instrument('', '', '', '', '', -1, -1));
  priceDetails: Price[] = [];

  tradeOrderMap : any = {
    order: {}, trade: {}
  }
  constructor(private http: HttpClient) {}

  getAllInstruments() : Observable<Price[]>{
    
    return this.http.get<Price[]>(this.fmtsUrl+'prices')
  }

  dbUrl: string = 'http://localhost:8080/trades'
  getAllTradeByClientId(clientId : string) : Observable<Trade[]>{
    console.log(`${this.dbUrl}/tradeClient/${clientId}`)
    clientId = "C101"
    return this.http.get<Trade[]>(`${this.dbUrl}/tradeClient/${clientId}`)
  }

  headers = new HttpHeaders({
    'content-type' : 'application/json'
  })

  saveOrder(orderObj:Order): any{
    console.log(`${this.dbUrl}/order}`)
    return this.http.post( `${this.dbUrl}/order`, orderObj,  { headers: this.headers })
    // return this.http.post( `${this.usersUrl}/add`,newConfig);
  
  }

  saveTrade(trade: Trade){
    console.log("inside trade service**"+ JSON.stringify(trade))
    this.http.post( 'http://localhost:8080/trades/trade',trade, { headers: this.headers } )
    
  }

  saveOrderandTrade(orderObj:Order, tradeObj:Trade): Observable<Trade[]>{
    this.tradeOrderMap.order = orderObj
    this.tradeOrderMap.trade = tradeObj
    console.log("POST Spring: ",  JSON.stringify(this.tradeOrderMap));
    return this.http.post<Trade[]>(this.dbUrl, JSON.stringify(this.tradeOrderMap))
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
