import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceListComponent } from './preference-list.component';

describe('PreferenceListComponent', () => {
  let component: PreferenceListComponent;
  let fixture: ComponentFixture<PreferenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should contain a table', () => {
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    console.log(table);expect(table.rows.length).toBe(2);
    // expect(table.rows[0].cells[0].textContent).toBe('The Lord of the Rings')
  });

});
