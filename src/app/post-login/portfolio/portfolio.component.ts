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

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  public portfolio: Portfolio[] = [];
  public selected = false;
  public index = -1;

  public soldentirely = true;

  constructor(public ps: PortfolioService) {}

  instrumentSymbol: string = '';
  order: Order = new Order('', -1, -1, '', '', '');
  soldEntirely: boolean = false;
  ngOnInit(): void {
    this.ps.getPortfolio().subscribe((data) => {
      this.portfolio = data;
    });
  }
  ngAfterViewInit(): void {
    this.getallportfolio();
    console.log(this.portfolio);
  }

  getallportfolio() {
    this.ps.getPortfolio().subscribe((data) => {
      this.portfolio = data;
    });
  }

  showModal: boolean = false;
  instrument: Price = new Price(
    '',
    -1,
    -1,
    new Date(),
    new Instrument('', '', '', '', '', -1, -1)
  );

  displaySellTab(instrumentId: string) {
    console.log('HELOO hi', instrumentId);

    this.instrument = this.ps.getInstrument(instrumentId);

    this.order.quantity = this.instrument.instrument.minQuantity;
    this.order.direction = 'S';
    this.showModal = true;

    console.log('in display', this.instrument);
   
    console.log('in sell display', this.instrument);
  }

 
  submit() {
    this.getallportfolio;
  }

  hideDialog(show: boolean) {
    this.showModal = show;
    if (this.soldEntirely) {
      console.log(this.soldEntirely);
    }
  }

  setSoldAllStocks(sold: boolean) {
    this.soldEntirely = sold;
  }

 
}
