import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeService } from '../../services/trade.service';
import { v4 as uuid } from 'uuid';
import { Trade } from 'src/app/models/trade';

@Component({
  selector: 'app-trade-transaction',
  templateUrl: './trade-transaction.component.html',
  styleUrls: ['./trade-transaction.component.css'],
  providers: [MessageService]
})
export class TradeTransactionComponent implements OnInit {

  @Input() instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  @Input() order: Order = new Order('',-1,-1,'','','', new Date())
  @Output() showModalEvent = new EventEmitter()
  @Output() soldAllStocks = new EventEmitter()

  trade: Trade  = new Trade('',-1,-1,'','',new Order('',-1,-1,'','','', new Date()),'',-1,'')
  newTrade :any = {}
  hideDialog(){
    console.log("In page", this.showModal)
    this.showModalEvent.emit(this.showModal)
  }


  constructor(private messageService: MessageService, private tradeService: TradeService) {}

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

  private clientId : any = localStorage.getItem('client');
  generateOrder() {
    this.showModal = false;
    this.showModalEvent.emit(this.showModal)
    
    if (this.isCapable()) {
      //this.order.direction = 'B';
      this.order.targetPrice = this.instrument.bidPrice * this.order.quantity;
      this.order.instrumentId = this.instrument.instrument.instrumentId;
      this.order.clientId = this.clientId
      this.order.orderId = uuid();
    }
    console.log(this.order);
    this.generateTrade(this.order)
    this.showToast();
    let soldAll = ( this.order.quantity === this.maxQ)? true: false
    this.soldAllStocks.emit(soldAll)
    console.log("Sold All-", soldAll)

    
    //console.log("SUCCESS:",this.tradeService.saveOrder(this.order))
    // return this.tradeService.placeOrder(this.order) ? true : false;
  }


  generateTrade(newOrder: Order){
    this.trade.tradeId= uuid()
    this.trade.quantity = newOrder.quantity
    this.trade.executionPrice = newOrder.targetPrice
    this.trade.direction = newOrder.direction
    this.trade.cashValue = newOrder.targetPrice + 100 // fees
    this.trade.clientId = newOrder.clientId
    this.trade.instrumentId = newOrder.instrumentId
    this.trade.orderId = newOrder.orderId
    this.trade.order = newOrder
    console.log(JSON.stringify(this.trade))
    this.tradeService.saveTrade(this.trade)
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
