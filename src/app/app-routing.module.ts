import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './post-login/landing/landing.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterComponent},
  {path:'pl', component: LandingComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
