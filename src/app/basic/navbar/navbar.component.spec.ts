import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';


@Component({selector: 'app-links',template: 'mock links'})
class mocklinkscomponent{@Input() navlinks:string=''}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent,mocklinkscomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should pass link value to the child component', () =>{
    const links = fixture.debugElement.query(By.css('app-links')).componentInstance;
   expect(links.navlinks).toBe('portfolio');});
   it('should show menu on button click', (() => {
    spyOn(component, 'hamburger_click');
    const nativeElement = fixture.debugElement.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    expect(component.hamburger_click).toHaveBeenCalled();
  }));
});
