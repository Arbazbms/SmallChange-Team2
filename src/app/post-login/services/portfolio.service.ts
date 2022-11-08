import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Price } from 'src/app/models/price';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  // public portfolios: Portfolio[] = [
  //   {
  //     instrument: 'Amazon',
  //     instrumentid: 'AMZN',
  //     orderid: '1',
  //     costprice: 234,
  //     marketprice: 424,
  //     gain: 190,
  //     ifgain: true,
  //     selected: false,
  //   },
  //   {
  //     instrument: 'Ford',
  //     instrumentid: 'F',
  //     orderid: '2',
  //     costprice: 234,
  //     marketprice: 24,
  //     gain: -210,
  //     ifgain: false,
  //     selected: false,
  //   },
  //   {
  //     instrument: 'Disney',
  //     instrumentid: 'DIS',
  //     orderid: '3',
  //     costprice: 234,
  //     marketprice: 24,
  //     gain: -210,
  //     ifgain: false,
  //     selected: false,
  //   },
  //   {
  //     instrument: 'Amazon',
  //     instrumentid: 'AMZN',
  //     orderid: '4',
  //     costprice: 234,
  //     marketprice: 424,
  //     gain: 190,
  //     ifgain: true,
  //     selected: false,
  //   },
  // ];

  // public instruments: Price[] = [
  //   {
  //     instrumentId: 'AMZN',
  //     bidPrice: 100,
  //     askPrice: 200,
  //     timeStamp: new Date('12/10/2006'),
  //     instrument: {
  //       instrumentId: 'AMZN',
  //       instrumentDescription: 'Amazon',
  //       externalIdType: 'ISIN',
  //       externalId: 'ISIN14577',
  //       categoryId: 'MainIndex',
  //       minQuantity: 10,
  //       maxQuantity: 130,
  //     },
  //   },
  //   {
  //     instrumentId: 'DIS',
  //     bidPrice: 5,
  //     askPrice: 3,
  //     timeStamp: new Date('12/10/2006'),
  //     instrument: {
  //       instrumentId: 'DIS',
  //       instrumentDescription: 'Disney',
  //       externalIdType: 'ISIN',
  //       externalId: 'ISIN01682',
  //       categoryId: 'MainIndex',
  //       minQuantity: 2,
  //       maxQuantity: 39,
  //     },
  //   },
  //   {
  //     instrumentId: 'F',
  //     bidPrice: 2,
  //     askPrice: 2,
  //     timeStamp: new Date('12/10/2006'),
  //     instrument: {
  //       instrumentId: 'F',
  //       instrumentDescription: 'Ford',
  //       externalIdType: 'ISIN',
  //       externalId: 'ISIN86356',
  //       categoryId: 'InternationalMarket',
  //       minQuantity: 1,
  //       maxQuantity: 24,
  //     },
  //   },
  // ];

  restUrl: string = 'http://localhost:8080/api';
  fmtsUrl: string = 'http://localhost:3000/fmts/trades/';

  url: string = 'http://localhost:8080/api/portfolio';
  constructor(private http: HttpClient) {}

  getPortfolio(clientId: string): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.restUrl}/portfolio/${clientId}`);
  }

  public headers = new HttpHeaders({
    'Content-type' : 'application/json'
  })
  
  savePortfolio(portfolio :Portfolio): Observable<any>{
    return this.http.post(this.url, JSON.stringify(portfolio), {headers: this.headers}).pipe(catchError(this.handleError));
  };

  updatePortfolio(portfolio :Portfolio): Observable<any>{
    return this.http.put<any>(this.url, JSON.stringify(portfolio), {headers: this.headers}).pipe(catchError(this.handleError));
  };

  deletePortfolio(clientId: string): Observable<any> {
    console.log("try deleting");
    
    return this.http.delete<any>(`${this.restUrl}/portfolio/${clientId}`);
  }

  instruments: Price[] = [];

  getAllInstruments(): Observable<Price[]> {
    return this.http.get<Price[]>(this.fmtsUrl + 'prices');
  }

  getInstrument(instrumentid: string): Price {
    this.getAllInstruments().subscribe((element) => {
      this.instruments = <Price[]>element;
      let data: Price;
      for (data of this.instruments) {
        if (data.instrument.instrumentId === instrumentid) {
          return data;
        }
      }
    });
    return this.instruments[0];
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => 'Unable to contact service; please try again later.'
    );
  }
}
