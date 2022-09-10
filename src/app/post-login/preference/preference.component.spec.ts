import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferenceService } from '../services/preference.service';

import { PreferenceComponent } from './preference.component';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;

  beforeEach(async () => {
    let mockprefService: any= jasmine.createSpyObj('mockprefService',['savePreferences','addBook']);
    // mockprefService.savePreferences.and.returnValue( of(testBooks));
    mockprefService.savePreferences('test')
    await TestBed.configureTestingModule({
      declarations: [ PreferenceComponent ],
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
});
