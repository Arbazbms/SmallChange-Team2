import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit,AfterViewInit, OnDestroy{

  public portfolio:Portfolio[]=[]
  @ViewChild('dataTable')dataTable:any;
  // dataTable:any;
  dtOptions:DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(public ps: PortfolioService) { }

  ngOnInit(): void {
    this.ps.getPortfolio().subscribe(data=>{
      this.portfolio=data
      
    })

  }
  ngAfterViewInit(): void {
    this.getallportfolio()
    console.log(this.portfolio)


  }
  getallportfolio(){
    // this.ps.getPortfolio().subscribe(data=>{
    //   this.portfolio=data
      this.dtTrigger.next(this.dataTable);
      this.dtOptions = {
        data:this.portfolio,
        paging:true,
        ordering:true,
        responsive: true,
        columnDefs:[{"defaultContent": "-",'targets': [4], /* column index */
        'orderable': false, /* true or false */},
                     {"targets": "_all","searchable" :true}],
        searching:true,
     
         columns:[
                  {title:'Stock',data:'instrument',className:'gain'},
                  {title:'CostPrice',data:'costprice'},
                  {title:'MarketPrice',data:'marketprice'},
                  {title:'Gain/Loss',data:'gain'},
                  {
                    defaultContent: "<button class='btn btn-success ' style=background-color: #568200 !imposrtant;padding-right:10px;padding-left:10px;margin-left:10%;>Sell </button>"
                  }
                  ]
  
      };
           
 
  
  

    // }),
  
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  submit(){
    this.getallportfolio
  }

}

