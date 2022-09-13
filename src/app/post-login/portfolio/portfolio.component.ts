import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
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
export class PortfolioComponent implements OnInit, OnDestroy {
  public portfolio: Portfolio[] = [];
  @ViewChild('dataTable') table: any;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public ps: PortfolioService) {}

  instrumentSymbol: string = ''
  order: Order = new Order('', -1, -1, '', '', '');

  ngOnInit(): void {
    this.getallportfolio();
    console.log(this.portfolio);
    //this.ps.getInstrument('Disney');
  }

  displaySellTab(ins:string) {
    console.log('HELOO');

    this.instrument = this.ps.getInstrument(ins);
    this.order.quantity = this.instrument.instrument.minQuantity;
    this.order.direction = 'S';
    this.showModal = true;
    console.log('in display', this.instrument);
  }

  getallportfolio() {
    this.ps.getPortfolio().subscribe((data) => {
      this.portfolio = data;
      this.dtTrigger.next(this.table);
      this.dtOptions = {
        data: this.portfolio,
        paging: true,
        ordering: true,
        responsive: true,
        columnDefs: [
          {
            defaultContent: '-',
            targets: [4] /* column index */,
            orderable: false /* true or false */,
          },
          { targets: '_all', searchable: true },
        ],
        searching: true,

        columns: [
          { title: 'Stock', data: 'instrument' },
          { title: 'CostPrice', data: 'costprice' },
          { title: 'MarketPrice', data: 'marketprice' },
          { title: 'Gain/Loss', data: 'gain' },
          {
            defaultContent:
              "<button class='showIdButton myclass btn-success' style=padding:5px;margin-left:10%;>Sell </button>",
          },
        ],
      };

      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable(this.dtOptions);
    }),
      this.dtTrigger.next(1);
    var self = this
    $('div div table tbody').on('click', 'tr', function () {
      console.log(
        'helllo', this.getElementsByTagName('td')[0].innerHTML,
      );
      this.instrumentSymbol =this.getElementsByTagName('td')[0].innerHTML
      // this.instrument = this.ps.getInstrument('Disney');
      // this.order.quantity = this.instrument.instrument.minQuantity;
      // this.order.direction = 'S';
      // this.showModal = true;
      //console.log('in display', this.showModal);
      self.displaySellTab(this.instrumentSymbol)
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

  

  display() {
    console.log('Hellp');
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  submit() {
    this.getallportfolio;
  }

  hideDialog(show: boolean) {
    this.showModal = show;
  }
}
