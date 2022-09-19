import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ReportComponent } from './report.component';
@Component({
  selector: 'app-navbar',
  template: `<div></div>`,

})
class MockNavbarComponent  {};
describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent,MockNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one canvas for each chart ',()=>{
   
    expect(fixture.debugElement.queryAll(By.css('canvas')).length).toEqual(3);
  })
  it('should contain canvas elements with respective unqiue ids',()=>{
        expect(fixture.debugElement.query(By.css('#lineChart'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#barChart'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#pieChart'))).toBeTruthy();
  })

  it('should render title in h1 tag',()=>{
   
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain("Client Activity Report");

});
 
});
