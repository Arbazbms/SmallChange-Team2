import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceService } from '../services/preference.service';

import { PreferenceComponent } from './preference.component';

@Component({selector: 'app-preference-list',template: 'mock Preference list'})
class MockPreferenceListComponent{}

@Component({selector:'app-navbar', template:'mock nav bar'})
class MockNavbarComponent{}

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;

  beforeEach(async () => {
    let mockprefService: any= jasmine.createSpyObj('mockprefService',['savePreferences','getPreferenceById', 'updatePreference']);
    // mockprefService.savePreferences.and.returnValue( of(testBooks));
    mockprefService.savePreferences('test')
    await TestBed.configureTestingModule({
      declarations: [ PreferenceComponent, MockPreferenceListComponent, MockNavbarComponent ],
      providers: [{ provide: PreferenceService, useValue: mockprefService }],
      imports:[ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should validate Forms Fields', ()=>{
    const investmentPurposeContorl = component.preferanceForm.get('investmentPurpose')
    const riskToleranceControl = component.preferanceForm.get('riskTolerance')
    const incomeCategoryControl = component.preferanceForm.get('incomeCategory')
    const lengthOfInvestmentControl = component.preferanceForm.get('lengthOfInvestment')

    expect(component.preferanceForm.valid).toBeFalsy();

    expect(investmentPurposeContorl?.hasError('required')).toBeTruthy();
    expect(riskToleranceControl?.hasError('required')).toBeTruthy();
    expect(incomeCategoryControl?.hasError('required')).toBeTruthy();
    expect(lengthOfInvestmentControl?.hasError('required')).toBeTruthy();


    investmentPurposeContorl?.setValue('my Purpose')
    riskToleranceControl?.setValue('Aggressive')
    incomeCategoryControl?.setValue('0-1000');
    lengthOfInvestmentControl?.setValue('0-5 years')

    expect(component.preferanceForm.valid).toBeTruthy();

  })

  
});
