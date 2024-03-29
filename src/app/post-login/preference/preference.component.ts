import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preference } from 'src/app/models/preference';
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
  preferenceExistingData:any = {};
  showAdd:Boolean = false;
  showUpdate: Boolean = false;
  errorMessage: string = "";
  clientID:string = ""


  constructor(private formBuilder: FormBuilder, private prefService: PreferenceService) { }



   ngOnInit():void {

    this.clientID = String(localStorage.getItem('client'));
    console.log("aaaaaaaaaaaaaaaaaaaaaacccc",this.clientID);
    this.getPreferenceById();

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

  getPreferenceById(){
    console.log("iiiisssii")
    this.prefService.getPreferenceById(this.clientID).subscribe({
      next : (data) => {this.preferenceExistingData = data; this.errorMessage = ''},
      error : (err) => {this.errorMessage = err}

    })

    console.log("Spring: ", this.preferenceExistingData);
  }

  closeModelWhenSucess(){
    let ref = document.getElementById('cancel')
    ref?.click();
  }
  updatePreference(){
    let prefObj:Preference = new Preference(this.clientID, this.preferanceForm.value.investmentPurpose, this.preferanceForm.value.riskTolerance, this.preferanceForm.value.incomeCategory, this.preferanceForm.value.lengthOfInvestment)
    console.log("update button clicked clicked")
    this.prefService.updatePreference(this.clientID, prefObj).subscribe((data) => {
      console.log("UPDATE SUCCESS : ", data)
      this.getPreferenceById();
      this.closeModelWhenSucess()
    })
  }
  editMyPreference(preference: Preference){
    this.preferanceForm.controls['investmentPurpose'].setValue(preference.investmentPurpose)
    this.preferanceForm.controls['riskTolerance'].setValue(preference.riskTolerance)
    console.log('Output send values: ', preference.lengthOfInvestment)
    this.preferanceForm.controls['incomeCategory'].setValue(preference.incomeCategory)
    this.preferanceForm.controls['lengthOfInvestment'].setValue(preference.lengthOfInvestment)
    // this.updatePreference()
    this.showUpdate = true
    

  }

  // to be used later
  getPrefObj(){
    return {
      "investmentPurpose": "updated",
      "riskTolerance": "qq1",
      "incomeCategory": "11",
      "lengthOfInvestment": "12-888"
    }
  }

  clickAdd(){
    this.showAdd = true
    this.showUpdate = false
  }
   onSubmit(){
    console.log("pref control value::-> ",this.preferanceForm.controls['investmentPurpose'].value)
    let prefObj:Preference = new Preference(this.clientID, this.preferanceForm.value.investmentPurpose, this.preferanceForm.value.riskTolerance, this.preferanceForm.value.incomeCategory, this.preferanceForm.value.lengthOfInvestment)
    this.prefService.savePreferences(prefObj).subscribe(data => {
      console.log('Pref saved data:', data)
      this.closeModelWhenSucess()
    })
    this.preferanceForm.reset()
    location.reload()
  }

}
