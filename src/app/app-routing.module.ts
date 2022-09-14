import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivityComponent } from './post-login/activity/activity.component';
import { LandingComponent } from './post-login/landing/landing.component';
import { PreferenceComponent } from './post-login/preference/preference.component';

import { ReportComponent } from './post-login/report/report.component';

import { AuthGuard } from './post-login/services/auth.guard';


const routes: Routes = [
  // {path:'', component:LandingPageComponent},
  {path: 'login', component: LoginFormComponent},

  {path:'report', component:ReportComponent},



  {path: 'register', component: RegisterComponent,
  //  canActivate:[AuthGuard]
  },

  // {path:'pl', component: LandingComponent},
  // {path:'preference', component:PreferenceComponent},
  // {path:'activity', component:ActivityComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
