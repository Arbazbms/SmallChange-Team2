import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public portfolios:Portfolio[]=
  [
    {'instrument':'amzn','instrumentid':'234a','orderid':'ww2q','costprice':234,'marketprice':424,'gain':190,'ifgain':true},
    {'instrument':'NFLX','instrumentid':'234a','orderid':'ww2q','costprice':234,'marketprice':24,'gain':-210,'ifgain':false},
    {'instrument':'FORD','instrumentid':'234a','orderid':'ww2q','costprice':234,'marketprice':24,'gain':-210,'ifgain':false},
    {'instrument':'amzn','instrumentid':'234a','orderid':'ww2q','costprice':234,'marketprice':424,'gain':190,'ifgain':true},
  ]
  constructor() { }

  getPortfolio():Observable<Portfolio[]>{
    return of(this.portfolios)
  }
}
