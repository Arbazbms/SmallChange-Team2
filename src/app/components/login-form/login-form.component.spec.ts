import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { Identification } from 'src/app/models/identification.model';
import { ClientService } from 'src/app/services/client.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;


  beforeEach(async () => {
    let testClients:Client[] = [
      new Client(0,'h31','Arbazcs@gmail.com','Arbaz','22-09-9090','india','111111','11111111',new Identification('','')),
      new Client(0,'','','','','','','',new Identification('',''))
    ]
    let clientService:any = jasmine.createSpyObj('ClientService', ['addClient', 'getClients'])
    clientService.getClients.and.returnValue(of(testClients))


    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports:
      [FormsModule,ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: ClientService, Router, useValue: clientService, useClass: class { navigate = jasmine.createSpy("navigate")}}]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Should validate Login Forms Fields', ()=>{
    const emailContorl = component.loginForm.get('email')
    const passwordControl = component.loginForm.get('password')


    expect(component.loginForm.valid).toBeFalsy();

    expect(emailContorl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();



    emailContorl?.setValue('Arbazcs@gmail.com')
    passwordControl?.setValue('Aggressive')


    expect(component.loginForm.valid).toBeTruthy();

  })
});
