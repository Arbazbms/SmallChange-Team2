import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TradeService } from '../services/trade.service';
import { Subject, take } from 'rxjs';
import { TradeHist } from '../models/trade-hist';
import { TradeHistory } from '../services/tradeHistory.service';

declare var $:any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})



export class ActivityComponent implements OnInit, OnDestroy{
  public tradeHist:TradeHist[]=[];
  @ViewChild('dataTable')table:any;
  dataTable:any;
  dtOptions:DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  
  constructor(private tradeService:TradeHistory) {
    
   }
  
  
  
  ngOnInit(): void {
        //this.tradeService.getTradeHist().pipe(take(1)).subscribe(list=>{
 
       //
      this.getAlltrade()
  }
     getAlltrade(){
      this.tradeService.getTradeHist().subscribe(data=>{
        this.tradeHist=data
        this.dtTrigger.next(this.table);
  this.dtOptions = {
          data:this.tradeHist,
          paging:true,
          ordering:true,
          responsive: true,
          columnDefs:[{"defaultContent": "-","targets":[6],"type":"date"},
                       {"targets": "_all","searchable" :true}],
          searching:true,
       
           columns:[
                    {title:'Asset Class',data:'asset'},
                    {title:'Side',data:'side'},
                    {title:'Security',data:'security'},
                    {title:'Account',data:'account'},
                    {title:'Qty',data:'qty'},
                    {title:'Cash Value',data:'cash'},
                    {title:'Date',data:'date'},
                   
                    ]
  
        };
             
       this.dataTable=$(this.table.nativeElement);
       this.dataTable.DataTable(this.dtOptions);
       }),
       this.dtTrigger.next(1);
      }
       ngOnDestroy(): void {
       this.dtTrigger.unsubscribe();
      }
      submit(){
        this.getAlltrade;
      }
  }  
         
      
      //console.log(this.tradeHist);
          
       


       


  
