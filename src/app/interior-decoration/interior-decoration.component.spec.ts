import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorDecorationComponent } from './interior-decoration.component';

describe('InteriorDecorationComponent', () => {
  let component: InteriorDecorationComponent;
  let fixture: ComponentFixture<InteriorDecorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteriorDecorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteriorDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
