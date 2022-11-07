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

declare var $: any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  public tradeHist: TradeHist[] = [];
  @ViewChild('dataTable') table: any;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private tradeService: TradeHistory) {}

  ngOnInit(): void {
    this.getAllTrade();
  }
  getAllTrade() {
    this.tradeService.getTradeHist().subscribe((data) => {
      this.tradeHist = data;
      console.log(this.tradeHist);
    })}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  submit() {
    this.getAllTrade;
  }
}


    