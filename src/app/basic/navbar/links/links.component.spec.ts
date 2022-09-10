import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksComponent,
                       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    component.navlinks='test input'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show TEST INPUT', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mylink').innerText).toEqual('Test input');
  });
});
