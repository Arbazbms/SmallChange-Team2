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
    //TableModule
  ],
  exports: [
    TradePageComponent
  ]
})
export class TradeModule { }
