import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TradeService } from '../services/trade.service';
import { take } from 'rxjs';
import { TradeHist } from '../models/trade-hist';

declare var $:any;
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})



export class ActivityComponent implements OnInit{
  
  @ViewChild('dataTable')table:any;
  dataTable:any;
  dtOptions:DataTables.Settings = {};
  tradeHist:any[]=[];
  constructor(private tradeService:TradeService) { }
  
  
  ngOnInit(): void {
    // this.tradeService.getTradeHist().pipe(take(1)).subscribe(list=>{
 
         this.tradeHist =  this.tradeService.getTradeHist()
      
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
                   {title:'CashValue',data:'date'}
                    ]
  
        };
             
       this.dataTable=$(this.table.nativeElement);
       this.dataTable.DataTable(this.dtOptions);
       } 
  }  
         
      
      //console.log(this.tradeHist);
          
       


       


  
