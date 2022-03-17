import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsFormComponent } from './qualifications-form.component';

describe('QualificationsFormComponent', () => {
  let component: QualificationsFormComponent;
  let fixture: ComponentFixture<QualificationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
