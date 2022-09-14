import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradePageComponent } from './trade-page/trade-page.component';
import { TradeTableComponent } from './trade-table/trade-table.component';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import {ToastModule} from 'primeng/toast';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { TradeTransactionComponent } from './trade-transaction/trade-transaction.component';
import { NavbarComponent } from 'src/app/basic/navbar/navbar.component';
import { BasicModule } from 'src/app/basic/basic.module';
//import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    TradePageComponent,
    TradeTableComponent,
    TradeTransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    SliderModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    BasicModule
  ],
  exports: [
    TradePageComponent,
    TradeTransactionComponent
  ]
})
export class TradeModule { }
