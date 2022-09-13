import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { LandingComponent } from './landing/landing.component';
import { ReportComponent } from './report/report.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TradePageComponent } from './trade/trade-page/trade-page.component';
import { PreferenceComponent } from './preference/preference.component';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes=[
      {path:'', component:LandingPageComponent},
      {path: 'activity',component: ActivityComponent, canActivate:[AuthGuard]},
      {path: 'landing',component: LandingComponent, canActivate:[AuthGuard]},
      {path: 'report',component: ReportComponent, canActivate:[AuthGuard]},
      {path: 'trade',component: TradePageComponent, canActivate:[AuthGuard]},
      {path: 'portfolio',component: PortfolioComponent, canActivate:[AuthGuard]},
      {path:'preference', component:PreferenceComponent, canActivate:[AuthGuard]},
  
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
