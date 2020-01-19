import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeFurnitureComponent } from './office-furniture.component';

describe('OfficeFurnitureComponent', () => {
  let component: OfficeFurnitureComponent;
  let fixture: ComponentFixture<OfficeFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
