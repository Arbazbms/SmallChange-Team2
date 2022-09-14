import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { ResDataModal } from '../models/resDataModal';
import { Observable, of } from 'rxjs';
import { TradeHist } from '../models/trade-hist';

const tradeHist:any[]=[
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
  },{
    "asset":"Real Estate",
    "side":"Buy",
    "security":"GooG",
    "account":"ICICI",
    "qty":19,
    "cash":500,
    "date":"2022/5/4"
  },
  {
    "asset":"Commodities",
    "side":"Buy",
    "security":"Tata",
    "account":"HDFC",
    "qty":12,
    "cash":800,
    "date":"2022/2/4"
  },
  {
    "asset":"Commodities",
    "side":"Buy",
    "security":"Tata",
    "account":"HDFC",
    "qty":10,
    "cash":300,
    "date":"2022/3/4"
  },
  {
    "asset":"Real Estate",
    "side":"Buy",
    "security":"GooG",
    "account":"HDFC",
    "qty":6,
    "cash":500,
    "date":"2022/7/14"
  },
  {
    "asset":"Equity",
    "side":"Sell",
    "security":"MSFT",
    "account":"ICICI",
    "qty":5,
    "cash":700,
    "date":"2022/9/4"
  },
  {
    "asset":"Real Estate",
    "side":"Buy",
    "security":"MSFT",
    "account":"HDFC",
    "qty":12,
    "cash":700,
    "date":"2021/7/4"
  },
  {
    "asset":"Equity",
    "side":"Sell",
    "security":"MD",
    "account":"Kotak",
    "qty":16,
    "cash":700,
    "date":"2017/11/4"
  },
  {
    "asset":"Real Estate",
    "side":"Sell",
    "security":"NVDA",
    "account":"Kotak",
    "qty":1,
    "cash":700,
    "date":"2022/2/11"
  },
  {
    "asset":"Fixed Income",
    "side":"Buy",
    "security":"Apple",
    "account":"HDFC",
    "qty":15,
    "cash":4400,
    "date":"2020/11/4"
  },
  {
    "asset":"Fixed Income",
    "side":"Sell",
    "security":"Tesla",
    "account":"HDFC",
    "qty":15,
    "cash":8700,
    "date":"2012/1/4"
  },
  {
    "asset":"Equity",
    "side":"Sell",
    "security":"PEP",
    "account":"HDFC",
    "qty":15,
    "cash":2300,
    "date":"2021/11/4"
  }
];

@Injectable({
  providedIn: 'root'
})

export class TradeHistory {
  
  //private url="http://localhost:3000/history";
  constructor() { }

  getTradeHist():Observable<any[]>{
    return of(tradeHist);
  }
}
