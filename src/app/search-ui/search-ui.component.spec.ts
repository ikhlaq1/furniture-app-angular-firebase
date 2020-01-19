import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUiComponent } from './import { NgAisInstantSearch } from "angular-instantsearch";search-ui.component';

describe('SearchUiComponent', () => {
  let component: SearchUiComponent;
  let fixture: ComponentFixture<SearchUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
