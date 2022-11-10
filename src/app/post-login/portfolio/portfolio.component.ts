import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { data } from 'jquery';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Price } from 'src/app/models/price';
import { PortfolioService } from '../services/portfolio.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  public portfolios: Portfolio[] = [];
  public selected = false;
  public index = -1;

  public portfolio_id :string = ""
  public soldentirely = true;
  private clientId : any = localStorage.getItem('client');
  constructor(public ps: PortfolioService) {}

  instrumentSymbol: string = '';
  order: Order = new Order('', -1, -1, '', '', '', new Date());
  soldEntirely: boolean = false;
  ngOnInit(): void {
    
    this.getAllInstruments()
    this.getallportfolio()
  }


  getallportfolio() {
    this.ps.getPortfolio(this.clientId).subscribe((data) => {
      this.portfolios = data;
      this.portfolios.forEach( (portfolio) => {
        portfolio.market_value = this.getMarketPrice(portfolio.instrument_id)
        portfolio.gain=(portfolio.cost_price-portfolio.market_value)*portfolio.quantity
        portfolio.ifgain=portfolio.cost_price>portfolio.market_value
      })
      
    });
  }

  showModal: boolean = false;
  instrument: Price = new Price('',-1,-1,new Date(),new Instrument('', '', '', '', '', -1, -1)  );
  portfolio : Portfolio = new Portfolio('','','','',-1,-1,-1)
  instruments : Price[] = []

  displaySellTab(instrumentId: string, portfolio_item_id:string) {
    console.log('HELOO hi', instrumentId);

    this.instrument = this.getInstrument(instrumentId);

    console.log('in display', this.instrument);

    this.order.quantity = this.instrument.instrument.minQuantity;
    this.order.direction = 'S';
    this.portfolio = this.getPortfolio(portfolio_item_id)
    this.showModal = true;

   
  }

  getPortfolio(id : string): Portfolio{
    let data: Portfolio;
    for (data of this.portfolios) {
      if (data.portfolio_item_id === id) {
        return data;
      }
    }

  return this.portfolios[0];
  }

  getAllInstruments(){
    this.ps.getAllInstruments().subscribe((element) => {
      this.instruments = <Price[]>element;
      console.log("ALL:",this.instruments);
    });
  }

  getInstrument(instrumentid: string): Price{
      let data: Price;
      for (data of this.instruments) {
        if (data.instrument.instrumentId === instrumentid) {
          return data;
        }
      }
  
    return this.instruments[0];
  }

  getMarketPrice(instrumentid: string): number{
    return this.getInstrument(instrumentid).askPrice

  }
 
  submit() {
    this.getallportfolio;
  }

  hideDialog(show: boolean) {
    this.showModal = show;
    // if (this.soldEntirely) {
    //   this.ps.deletePortfolio()
    // }
  }

  setSoldAllStocks(sold: boolean) {
    this.soldEntirely = sold;
  }

  clear(table: Table) {
    table.clear();
}

 
}
