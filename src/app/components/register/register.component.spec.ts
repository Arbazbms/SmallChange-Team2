import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Identification } from 'src/app/models/identification.model';
import { ClientService } from 'src/app/services/client.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let addclientSpy:any=jasmine.createSpyObj('ClientService',['addClient']);
  beforeEach(async () => {
    let mockclientService: any= jasmine.createSpyObj('mockclientService',['addClient',]);
    addclientSpy = mockclientService.addClient.and.callFake((param: any) => {return of(param);});
    // mockclientService.addClient('test')
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [{ provide: ClientService, useValue: mockclientService }],
      imports:[ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit an event on click', () =>{
    spyOn(component, 'onSubmit');
    spyOn(console,'log')
    const expected =  new Client(1,'h31','ashr@gmail.com','ashr',"24/1/1198",'india','832110','hello',new Identification('Adhaar','833396564956'));
    const form = fixture.debugElement.nativeElement.querySelector('form');
    component.registerForm.get('emailid')?.setValue(expected.email);
    component.registerForm.get('username')?.setValue(expected.username);
    component.registerForm.get('dob')?.setValue(expected.DOB);
    component.registerForm.get('country')?.setValue(expected.country);
    component.registerForm.get('postal')?.setValue(expected.postalCode);
    component.registerForm.get('password1')?.setValue(expected.password);
    component.registerForm.get('password2')?.setValue(expected.password);
    component.registerForm.get('idtype')?.setValue(expected.identity.type);
    component.registerForm.get('idval')?.setValue(expected.identity.value);
    form.dispatchEvent(new Event('ngSubmit'));
    expect(component.onSubmit).toHaveBeenCalled();
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeTruthy

    //  expect(console.log).toHaveBeenCalled();
  });
  it('should call the service to add a book', () =>{
    const expected =  new Client(1,'h31','ashr@gmail.com','ashr','24/07/11','india','832110','hello',new Identification('Adhar','833396564956'));
    const form = fixture.debugElement.nativeElement.querySelector('form');
    component.registerForm.get('emailid')?.setValue(expected.email);
    component.registerForm.get('username')?.setValue(expected.username);
    component.registerForm.get('dob')?.setValue(expected.DOB);
    component.registerForm.get('country')?.setValue(expected.country);
    component.registerForm.get('postal')?.setValue(expected.postalCode);
    component.registerForm.get('password1')?.setValue(expected.password);
    component.registerForm.get('password2')?.setValue(expected.password);
    component.registerForm.get('idtype')?.setValue(expected.identity.type);
    component.registerForm.get('idval')?.setValue(expected.identity.value);
    form.dispatchEvent(new Event('ngSubmit'));
    // component.onSubmit();
    component.client_to_be_added=expected
    fixture.detectChanges()
    expect(component.client_to_be_added.email).toBe('ashr@gmail.com');
    expect(addclientSpy).toHaveBeenCalled();
});
})
