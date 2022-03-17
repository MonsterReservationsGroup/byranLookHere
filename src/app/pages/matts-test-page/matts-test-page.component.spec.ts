import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattsTestPageComponent } from './matts-test-page.component';

describe('MattsTestPageComponent', () => {
  let component: MattsTestPageComponent;
  let fixture: ComponentFixture<MattsTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MattsTestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MattsTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
