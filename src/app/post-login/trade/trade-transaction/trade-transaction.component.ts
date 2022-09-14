import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeService } from '../../services/trade.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-trade-transaction',
  templateUrl: './trade-transaction.component.html',
  styleUrls: ['./trade-transaction.component.css'],
  providers: [MessageService]
})
export class TradeTransactionComponent implements OnInit {

  @Input() instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  @Input() order: Order = new Order('',-1,-1,'','','')
  @Output() showModalEvent = new EventEmitter()

  hideDialog(){
    console.log("In page", this.showModal)
    this.showModalEvent.emit(this.showModal)
  }

  constructor(private messageService: MessageService) {}

  showModal : boolean = true;
  buttonContent : string = ''
  minQ: any
  maxQ: any
  tradePrice: number= -1;
  ngOnInit() {
    console.log("Button",this.order.direction) 
    if( this.order.direction === 'B'){
      this.buttonContent = "Buy"
      this.minQ = this.instrument.instrument.minQuantity
      this.maxQ = this.instrument.instrument.maxQuantity
      this.tradePrice = this.instrument.bidPrice
    }
    else{
      this.buttonContent = "Sell"
      this.minQ = 1
      // should chnage this
      this.maxQ = this.order.quantity
      this.tradePrice = this.instrument.askPrice
    }
  }


  generateOrder() {
    if (this.isCapable()) {
      //this.order.direction = 'B';
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
