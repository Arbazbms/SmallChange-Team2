import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Preference } from 'src/app/models/preference';
import { PreferenceService } from '../services/preference.service';

import { PreferenceComponent } from './preference.component';

@Component({selector: 'app-preference-list',template: 'mock Preference list'})
class MockPreferenceListComponent{
  @Input() preferenceExistingData:any = {};
 @Output() EditPreference = new EventEmitter<Preference>();

}

@Component({selector:'app-navbar', template:'mock nav bar'})
class MockNavbarComponent{}

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;
  let addPreferenceSpy: any;

  beforeEach(async () => {

    let testPreference: Preference = 
      {
        "id": "A685a",
        "investmentPurpose": "Edu",
        "riskTolerance": "CONSERVATIVE",
        "incomeCategory": "40,001 - 60,000",
        "lengthOfInvestment": "10-15 years"
      }
    
    let mockprefService: any= jasmine.createSpyObj('mockprefService',['savePreferences','getPreferenceById', 'updatePreference']);
    mockprefService.getPreferenceById('A685a').and.returnValue(of(testPreference));
    // mockprefService.savePreferences('test')


    await TestBed.configureTestingModule({
      declarations: [ PreferenceComponent, MockPreferenceListComponent, MockNavbarComponent ],
      providers: [{ provide: PreferenceService, useValue: mockprefService }],
      imports:[ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
    addPreferenceSpy = mockprefService.savePreferences.and.callFake((param: any) => {return of(param);});

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });



  // it('Should validate Forms Fields', ()=>{
  //   const investmentPurposeContorl = component.preferanceForm.get('investmentPurpose')
  //   const riskToleranceControl = component.preferanceForm.get('riskTolerance')
  //   const incomeCategoryControl = component.preferanceForm.get('incomeCategory')
  //   const lengthOfInvestmentControl = component.preferanceForm.get('lengthOfInvestment')

  //   expect(component.preferanceForm.valid).toBeFalsy();

  //   expect(investmentPurposeContorl?.hasError('required')).toBeTruthy();
  //   expect(riskToleranceControl?.hasError('required')).toBeTruthy();
  //   expect(incomeCategoryControl?.hasError('required')).toBeTruthy();
  //   expect(lengthOfInvestmentControl?.hasError('required')).toBeTruthy();


  //   investmentPurposeContorl?.setValue('my Purpose')
  //   riskToleranceControl?.setValue('Aggressive')
  //   incomeCategoryControl?.setValue('0-1000');
  //   lengthOfInvestmentControl?.setValue('0-5 years')

  //   expect(component.preferanceForm.valid).toBeTruthy();

  // })

  
});
