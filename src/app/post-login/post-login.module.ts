import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ActivityComponent } from './activity/activity.component';
import { TradeComponent } from './trade/trade.component';
import { PreferenceComponent } from './preference/preference.component';
import { RoboAdvisorComponent } from './robo-advisor/robo-advisor.component';
import { ReportComponent } from './report/report.component';
import { BasicModule } from '../basic/basic.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostLoginRoutingModule } from './post-login-routing.module';
import { RouterModule } from '@angular/router';
import { PreferenceListComponent } from './preference-list/preference-list.component';



@NgModule({
  declarations: [
    LandingComponent,
    PortfolioComponent,
    ActivityComponent,
    TradeComponent,
    PreferenceComponent,
    RoboAdvisorComponent,
    ReportComponent,
    PreferenceListComponent
  ],
  imports: [
    CommonModule,
    BasicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostLoginRoutingModule,
    RouterModule
  ],

  exports: [
    LandingComponent
  ]
})
export class PostLoginModule { }
