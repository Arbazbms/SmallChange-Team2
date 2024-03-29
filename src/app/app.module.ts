import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http'
import { BasicModule } from './basic/basic.module';
import { PostLoginModule } from './post-login/post-login.module';
import { PostLoginRoutingModule } from './post-login/post-login-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostLoginModule,
    PostLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BasicModule,
    PostLoginModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
