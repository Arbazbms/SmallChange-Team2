import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  riskToleranceArray:any = ['CONSERVATIVE', 'BELOW AVERAGE,','AVERAGE,','ABOVE AVERAGE', 'AGGRESSIVE'];
  incomeCategotyArray:any = ['0 - 20,000', '20,001 - 40,000', '40,001 - 60,000', '60,001 - 80,000', '80,001 - 100,000', '100,001 - 150,000', '150,000+'];
  lengthOfIvestmentsArray:any = ['0-5 years', '5-7 years', '7-10 years', '10-15 years'];
  preferanceForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private prefService: PreferenceService) { }



  ngOnInit(): void {

    this.preferanceForm = this.formBuilder.group({
      investmentPurpose : ['', Validators.required],
      riskTolerance : ['', Validators.required],
      incomeCategory : ['', Validators.required],
      lengthOfInvestment : ['', Validators.required]

    })
  }
  
  get investmentPurpose() {
    return this.preferanceForm.get('investmentPurpose');
  }
  get riskTolerance(){
    return this.preferanceForm.get('riskTolerance')
  }
  get incomeCategory(){
    return this.preferanceForm.get('incomeCategory')
  }
  get lengthOfInvestment(){
    return this.preferanceForm.get('lengthOfInvestment')
  }

  // to be used later
  getPrefObj(obj:any){
    return {
      "id": "A" + Math.floor(Math.random()*1000),
      "investmentPurpose": this.preferanceForm.controls['investmentPurpose'].value,
      "riskTolerance": this.preferanceForm.controls['riskTolerance'].value,
      "incomeCategory":this.preferanceForm.controls['incomeCategory'].value,
      "lengthOfInvestment":this.preferanceForm.controls['lengthOfInvestment'].value
    }
  }

   onSubmit(){
    alert("submit")
    console.log("pref control value::-> ",this.preferanceForm.controls['investmentPurpose'].value)
    this.prefService.savePreferences(this.preferanceForm.value)
    this.preferanceForm.reset()
  }

}
