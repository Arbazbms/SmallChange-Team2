import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeModel } from 'src/app/models/trade-model';
import { TradeService } from '../../services/trade.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-trade-table',
  templateUrl: './trade-table.component.html',
  styleUrls: ['./trade-table.component.css'],
  providers: [MessageService]
})
export class TradeTableComponent implements OnInit {

  constructor(private tradeService: TradeService, private messageService: MessageService) {}

  instruments: Price[] = [];
  order: Order = new Order('',-1,-1,'','','', new Date())
  //order!: Order;
  priceDetails: Price[] = [];
  instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  showModal: boolean = false;
  categories : any;

  ngOnInit() {
    this.getAllInstruments();
  }

  getAllInstruments() {
    this.tradeService.getAllInstruments().subscribe((data) => {
      this.instruments = <Price[]>data;
      console.log(this.instruments);
      this.categories = [
        {label: "Stock", value:"STOCK"},
        {label: "Govt", value:"GOVT"},
        {label: "CD", value:"CD"}
      ]
    });
  }

  
  displayModal(instrument: Price) {
    this.order.quantity = instrument.instrument.minQuantity;
    this.order.direction = 'B'
    this.showModal = true;
    console.log('in display', instrument);

    this.instrument = instrument;
  }

  hideDialog(show : boolean){
    this.showModal = show
  }



  isCapable(): boolean {
    return true;
  }
}
