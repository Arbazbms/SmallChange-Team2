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
  constructor(private tradeHistoryService: TradeHistory, private tradeService: TradeService) {}

  ngOnInit(): void {
    this.getAllTradeHistory();
  }


  getAllTradeHistory(){
    this.tradeService.getAllTradeByClientId(this.clientId).subscribe( (data) => {
      this.trade = data
      console.log(this.trade)
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


    