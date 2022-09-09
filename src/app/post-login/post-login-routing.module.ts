import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { LandingComponent } from './landing/landing.component';
import { ReportComponent } from './report/report.component';
import { TradeComponent } from './trade/trade.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes=[
      {path: 'activity',component: ActivityComponent},
      {path: 'landing',component: LandingComponent},
      {path: 'report',component: ReportComponent},
      {path: 'trade',component: TradeComponent},
      {path: 'portfolio',component: PortfolioComponent},
     
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class PostLoginRoutingModule { }
