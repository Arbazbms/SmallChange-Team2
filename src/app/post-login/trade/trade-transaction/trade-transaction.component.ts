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

  portfolios : Portfolio[] = []
  trade: Trade  = new Trade('',-1,-1,'','',new Order('',-1,-1,'','','',  new Date()),'',-1,'')
  newTrade :any = {}
  hideDialog(){
    console.log("In page", this.showModal)
    this.showModalEvent.emit(this.showModal)
  }
  constructor(private messageService: MessageService, private tradeService: TradeService, private portfolioService: PortfolioService) {}

  
  private clientId : any = localStorage.getItem('client');
  showModal : boolean = true;
  buttonContent : string = ''
  minQ: any
  maxQ: any
  tradePrice: number= -1;
  ngOnInit() {
    console.log("Button",this.order.direction) 
    this.getAllPortfolio();
    
   //let  flag : boolean  = this.isPortfolioAvailable()
    if( this.order.direction === 'B'){
      this.buttonContent = "Buy"
      //this.portfolio.quantity =  this.instrument.instrument.minQuantity
      this.minQ = this.instrument.instrument.minQuantity
      //console.log(this.portfolio.quantity);
       
      this.maxQ = this.instrument.instrument.maxQuantity
      this.tradePrice = this.instrument.bidPrice
    }
    else{
      this.buttonContent = "Sell"
      this.minQ = 1
      // should chnage this
      this.maxQ = this.portfolio.quantity
      this.tradePrice = this.instrument.askPrice
      console.log(this.order);
      
    }
    console.log("PORTFOLIO:",this.portfolio);
    
   
    
  }

  getAllPortfolio(){
    this.portfolioService.getPortfolio(this.clientId).subscribe( data =>{
      this.portfolios = data
      let p: Portfolio;
      for (p of this.portfolios) {
        if (p.instrument_id === this.instrument.instrument.instrumentId) {
          this.portfolio = p
          console.log("inside is:",this.portfolio);
          
        }
    
    } })
  }
  generateOrder() {
    this.showModal = false;
    this.showModalEvent.emit(this.showModal)
    
    this.order.targetPrice = this.instrument.bidPrice * this.order.quantity;
    this.order.instrumentId = this.instrument.instrument.instrumentId;
    this.order.clientId = this.clientId
    this.order.orderId = uuid();
    this.order.quantity = this.portfolio.quantity
    
    this.generateTrade(this.order)
    this.showToast();
    


    this.tradeService.saveOrder(this.order).subscribe(data => {
      console.log("Order inserted ",data)
    })

    

    
    


   
  }

  

  generateTrade(newOrder: Order){
    this.trade.tradeId= uuid()
    this.trade.quantity = newOrder.quantity
    this.trade.executionPrice = newOrder.targetPrice
    this.trade.direction = newOrder.direction
    this.trade.cashValue = newOrder.targetPrice + 10 // fees
    this.trade.clientId = newOrder.clientId
    this.trade.instrumentId = newOrder.instrumentId
    this.trade.orderId = newOrder.orderId
    this.trade.order = newOrder
    // if( this.order.direction === 'B')
    // {
    //   this.generatePortfolio(this.trade)
    // }

    this.tradeService.saveTrade(this.trade).subscribe( data => {
        console.log("Inserting trade",data)
    })

    let soldAll = ( this.portfolio.quantity === this.maxQ)? true: false
    this.soldAllStocks.emit(soldAll)
    console.log("Sold All-", soldAll)

    if( this.order.direction === 'S'){
      if(soldAll){
        console.log("Sold delete-", this.portfolio.portfolio_item_id)
        this.portfolioService.deletePortfolio(this.portfolio.portfolio_item_id).subscribe( data =>{
          console.log("Deleting portfolio", data)
        })
        location.reload()
      }
      else{
        console.log("Sold update-", this.portfolio.portfolio_item_id)
        this.portfolioService.updatePortfolio(this.portfolio).subscribe( data =>{
          console.log("Updating portfolio", data)
        })
      }
    }
    else{
      this.generatePortfolio(this.trade)
    }

  }

  

  generatePortfolio(newOrder :Trade){
    console.log("Inside portfolio G");
    
    
    this.portfolio.quantity = newOrder.quantity
    this.portfolio.trade_id = newOrder.tradeId
    //console.log(JSON.stringify(this.portfolio))

    

      if( this.isPortfolioAvailable()){
        console.log("Portfolio available", this.portfolio.portfolio_item_id)
        this.portfolio.quantity = newOrder.quantity
        this.portfolio.trade_id = newOrder.tradeId
        this.portfolioService.updatePortfolio(this.portfolio).subscribe( data =>{
          console.log("Portfolio update:", data)
        })
      }else{
        this.portfolio.portfolio_item_id = uuid()
        this.portfolio.client_id = this.clientId
        this.portfolio.instrument_id = newOrder.instrumentId
        this.portfolio.cost_price = this.instrument.bidPrice
        this.portfolio.quantity = newOrder.quantity
        this.portfolio.trade_id = newOrder.tradeId
        this.portfolioService.savePortfolio(this.portfolio).subscribe( data => {
          console.log("Portfolio insert:",data)
        })
      }
    

    
  }

  isPortfolioAvailable() : boolean{
    let data: Portfolio;
    console.log("inside is:",this.portfolio);
          
      for (data of this.portfolios) {
        if (data.instrument_id === this.instrument.instrument.instrumentId) {
          this.portfolio = data
          console.log("inside is:",this.portfolio);
          
          return true;
        }
    
  }
  return false;
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
