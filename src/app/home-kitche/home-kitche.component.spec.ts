import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeKitcheComponent } from './home-kitche.component';

describe('HomeKitcheComponent', () => {
  let component: HomeKitcheComponent;
  let fixture: ComponentFixture<HomeKitcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeKitcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeKitcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
