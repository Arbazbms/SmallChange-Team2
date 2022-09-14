import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Price } from 'src/app/models/price';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  public portfolios: Portfolio[] = [
    {
      instrument: 'Amazon',
      instrumentid: 'AMZN',
      orderid: '1',
      costprice: 234,
      marketprice: 424,
      gain: 190,
      ifgain: true,
    },
    {
      instrument: 'Ford',
      instrumentid: 'F',
      orderid: '2',
      costprice: 234,
      marketprice: 24,
      gain: -210,
      ifgain: false,
    },
    {
      instrument: 'DISNEY',
      instrumentid: 'DIS',
      orderid: '3',
      costprice: 234,
      marketprice: 24,
      gain: -210,
      ifgain: false,
    },
    {
      instrument: 'Amazon',
      instrumentid: 'AMZN',
      orderid: '4',
      costprice: 234,
      marketprice: 424,
      gain: 190,
      ifgain: true,
    },
  ];

  public instruments: Price[] = [
    
      {
        instrumentId: 'AMZN',
        bidPrice: 100,
        askPrice: 200,
        timeStamp: new Date('12/10/2006'),
        instrument: {
          instrumentId: 'AMZN',
          description: 'Amazon.com',
          externalIdType: 'ISIN',
          externalId: 'ISIN14577',
          categoryId: 'MainIndex',
          minQuantity: 10,
          maxQuantity: 130,
        },
      },
      {
        instrumentId: 'DIS',
        bidPrice: 5,
        askPrice: 3,
        timeStamp: new Date('12/10/2006'),
        instrument: {
          instrumentId: 'DIS',
          description: 'Disney',
          externalIdType: 'ISIN',
          externalId: 'ISIN01682',
          categoryId: 'MainIndex',
          minQuantity: 2,
          maxQuantity: 39,
        },
      },
      {
        instrumentId: 'F',
        bidPrice: 2,
        askPrice: 2,
        timeStamp: new Date('12/10/2006'),
        instrument: {
          instrumentId: 'F',
          description: 'Ford',
          externalIdType: 'ISIN',
          externalId: 'ISIN86356',
          categoryId: 'InternationalMarket',
          minQuantity: 1,
          maxQuantity: 24,
        },
      },  
  ];

  //quantity : number = 100

  constructor() {}

  getPortfolio(): Observable<Portfolio[]> {
    return of(this.portfolios);
  }

  getInstrument (instrumentid : string) : Price {
    //let instrumentid = 'AMZN'
    this.instruments.forEach( (data) =>{
      if( data.instrumentId === instrumentid){
        return data
      }
      return 
    })
    return this.instruments[0]
  }
}
