import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Instrument } from 'src/app/models/instrument';
import { Order } from 'src/app/models/order';
import { Price } from 'src/app/models/price';
import { TradeService } from '../../services/trade.service';
import { v4 as uuid } from 'uuid';
import { Trade } from 'src/app/models/trade';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio } from 'src/app/models/portfolio.model';

@Component({
  selector: 'app-trade-transaction',
  templateUrl: './trade-transaction.component.html',
  styleUrls: ['./trade-transaction.component.css'],
  providers: [MessageService]
})
export class TradeTransactionComponent implements OnInit {

  @Input() instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  @Input() order: Order = new Order('',-1,-1,'','','',  new Date())
  @Input() portfolio : Portfolio = new Portfolio('','','','',-1,-1,-1)
  @Output() showModalEvent = new EventEmitter()
  @Output() soldAllStocks = new EventEmitter()

  trade: Trade  = new Trade('',-1,-1,'','',new Order('',-1,-1,'','','',  new Date()),'',-1,'')
  newTrade :any = {}
  hideDialog(){
    console.log("In page", this.showModal)
    this.showModalEvent.emit(this.showModal)
  }


  constructor(private messageService: MessageService, private tradeService: TradeService, private portfolioService: PortfolioService) {}

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
      console.log("here");
      
    }
    console.log("PORTFOLIO:",this.portfolio);
    
  }

  private clientId : any = localStorage.getItem('client');
  generateOrder() {
    this.showModal = false;
    this.showModalEvent.emit(this.showModal)
    
    //this.order.direction = 'B';
    this.order.targetPrice = this.instrument.bidPrice * this.order.quantity;
    this.order.instrumentId = this.instrument.instrument.instrumentId;
    this.order.clientId = this.clientId
    this.order.orderId = uuid();
    //this.order.dateTime = new Date().form
    
    this.generateTrade(this.order,this.instrument.bidPrice)
    this.showToast();
    let soldAll = ( this.order.quantity === this.maxQ)? true: false
    this.soldAllStocks.emit(soldAll)
    console.log("Sold All-", soldAll)

    if(soldAll){
      console.log("Sold POrtfolio delete-", this.portfolio.portfolio_item_id)
      this.portfolioService.deletePortfolio(this.portfolio.portfolio_item_id).subscribe( data =>{
        console.log("*****", data)
      })
    }
    else{
      console.log("Sold POrtfolio update-", this.portfolio.portfolio_item_id)
      this.portfolio.quantity = this.order.quantity
      this.portfolioService.updatePortfolio(this.portfolio).subscribe( data =>{
        console.log("*****", data)
      })
    }


    // this.tradeService.saveOrder(this.order).subscribe(data => {
    //   console.log("Order inserted ",data)
    // })
    // return this.tradeService.placeOrder(this.order) ? true : false;
  }


  generateTrade(newOrder: Order, cost:number){
    this.trade.tradeId= uuid()
    this.trade.quantity = newOrder.quantity
    this.trade.executionPrice = newOrder.targetPrice
    this.trade.direction = newOrder.direction
    this.trade.cashValue = newOrder.targetPrice + 10 // fees
    this.trade.clientId = newOrder.clientId
    this.trade.instrumentId = newOrder.instrumentId
    this.trade.orderId = newOrder.orderId
    this.trade.order = newOrder
    //this.generatePortfolio(this.trade,cost)
    // this.tradeService.saveTrade(this.trade).subscribe( data => {
    //   console.log("***",data)
    // })
  }

  

  generatePortfolio(newOrder: Trade, cost:number){
    console.log("Inside portfolio G");
    
    this.portfolio.portfolio_item_id = uuid()
    this.portfolio.client_id = this.clientId
    this.portfolio.quantity = newOrder.quantity
    this.portfolio.instrument_id = newOrder.instrumentId
    this.portfolio.trade_id = newOrder.tradeId
    this.portfolio.cost_price = cost
    console.log(JSON.stringify(this.portfolio))
    this.portfolioService.savePortfolio(this.portfolio).subscribe( data => {
      console.log("***",data)
    })
  }

  showToast() {
    this.messageService.add({
      key: 'buy',
      severity: 'success',
      summary: 'Order Successful',
      detail: 'Your order is submitted successfully',
    });
  }

  
  

}
