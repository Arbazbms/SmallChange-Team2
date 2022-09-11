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
  order: Order = new Order('',-1,-1,'','','')
  //order!: Order;
  showBuy: boolean = false;
  showSell: boolean = false;
  priceDetails: Price[] = [];
  instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  showModal: boolean = false;

  ngOnInit() {
    this.getAllInstruments();
  }

  getAllInstruments() {
    this.tradeService.getAllInstruments().subscribe((data) => {
      this.instruments = <Price[]>data;
      console.log(this.instruments);
    });
  }

  generateOrder() {
    if (this.isCapable()) {
      this.order.direction = 'B';
      this.order.targetPrice = this.instrument.bidPrice * this.order.quantity;
      this.order.instrumentId = this.instrument.instrumentId;
      this.order.clientId = 'SGAK';
      this.order.orderId = uuid();
    }
    console.log(this.order);
    this.showModal = false;

    this.showToast();

    // return this.tradeService.placeOrder(this.order) ? true : false;
  }
  displayModal(instrument: Price) {
    this.order.quantity = instrument.instrument.minQuantity;
    this.showModal = true;
    console.log('in display', instrument);

    this.instrument = instrument;
    console.log(this.instrument);
  }

  showToast() {
    this.messageService.add({
      key: 'buy',
      severity: 'success',
      summary: 'Order Successful',
      detail: 'Your order is submitted successfully',
    });
  }

  isCapable(): boolean {
    return true;
  }
}
