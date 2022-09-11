import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Preference } from 'src/app/models/preference';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.css']
})
export class PreferenceListComponent implements OnInit {

 @Input() preferenceExistingData:any = {};
 @Output() EditPreference = new EventEmitter<Preference>();

  constructor() { }

  add(row:any) { 
    this.EditPreference.emit( 
      new Preference(row.id, row.investmentPurpose, row.riskTolerance, row.incomeCategory, row.lengthOfInvestment)
   ); 
  }
  ngOnInit(): void {

    console.log("@Input value: ", this.preferenceExistingData)
  }

}
