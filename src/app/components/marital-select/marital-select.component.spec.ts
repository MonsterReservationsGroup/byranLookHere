import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalSelectComponent } from './marital-select.component';

describe('MaritalSelectComponent', () => {
  let component: MaritalSelectComponent;
  let fixture: ComponentFixture<MaritalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaritalSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaritalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
