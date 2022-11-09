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
  dbUrl: string = 'http://localhost:8080/trades'
  baseUrl: string = 'http://localhost:4000/';
  fmtsUrl: string = 'http://localhost:3000/fmts/trades/'
  
  price: Price = new Price('',-1, -1,new Date(),new Instrument('', '', '', '', '', -1, -1));
  instruments: Price[] = [];

  constructor(private http: HttpClient) {
  }

  

  getAllInstruments() : Observable<Price[]>{
    return this.http.get<Price[]>(this.fmtsUrl+'prices')
  }

  getAllTradeByClientId(clientId : string) : Observable<Trade[]>{
    //console.log(`${this.dbUrl}/tradeClient/${clientId}`)
    return this.http.get<Trade[]>(`${this.dbUrl}/tradeClient/${clientId}`)
  }

  getInstrumentNameById(instrumentId : string): string{
    let name = ""
    Object.entries(this.instruments).forEach(([key, element], index) => {
      if( element.instrumentId === instrumentId){
        //console.log(element.instrument.instrumentDescription);
        name = element.instrument.instrumentDescription
      }
    });
    return name
  }

  headers = new HttpHeaders({
    'content-type' : 'application/json'
  })

  saveOrder(orderObj:Order) :Observable<Trade[]>{
    return this.http.post<Trade[]>( `${this.dbUrl}/order`, orderObj,  { headers: this.headers })
  }

  saveTrade(trade: Trade):Observable<Trade[]>{
    return this.http.post<Trade[]>( 'http://localhost:8080/trades/trade',trade, { headers: this.headers } )
    
  }

}
