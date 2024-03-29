import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TradeService } from '../services/trade.service';
import { Subject, take } from 'rxjs';
import { TradeHist } from '../models/trade-hist';
import { TradeHistory } from '../services/tradeHistory.service';
import { Trade } from 'src/app/models/trade';
import { Instrument } from 'src/app/models/instrument';
import { Price } from 'src/app/models/price';

declare var $: any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  public tradeHist: TradeHist[] = [];
  public trade: Trade[] = []
  private clientId : any = localStorage.getItem('client');
  instrument: Price = new Price('',-1,-1,new Date(), new Instrument('','','','','',-1,-1))
  instruments: Price[] = [];
  constructor(private tradeHistoryService: TradeHistory, private tradeService: TradeService) {}

  categories: any = {}
  ngOnInit(): void {
    this.getAllTradeHistory();
    this.getInstruments();
    this.categories = [
      {label: "Buy", value:"B"},
      {label: "Sell", value:"S"}
    ]

    
  }

  getInstruments() {
    this.tradeService.getAllInstruments().subscribe((data) => {
      this.instruments = <Price[]>data;
      console.log(this.instruments);
    });
  }
  
  getInstrumentNameById(instrumentId : string): string{
    let name = ""
    Object.entries(this.instruments).forEach(([key, element], index) => {
      if( element.instrumentId === instrumentId){
        console.log(element.instrument.instrumentDescription);
        name = element.instrument.instrumentDescription
      }
    });
    return name
  }


  getAllTradeHistory(){
    this.tradeService.getAllTradeByClientId(this.clientId).subscribe( (data) => {
      this.trade = data
      console.log(this.trade[0])
      data.sort((a, b) => new Date(b.order.dateTime).getTime() - new Date(a.order.dateTime).getTime());
      this.trade = data
      console.log(this.trade[0])

      //data.sort((val1, val2)=> {return  Date.parse(val2.order.dateTime) - Date.parse(val1.order.dateTime)})
    })
  }

  getAllTrade() {
    this.tradeHistoryService.getTradeHist().subscribe((data) => {
      this.tradeHist = data;
      //console.log(this.tradeHist);
    })}

  submit() {
    this.getAllTrade;
  }
}


    