import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOffsetCardComponent } from './image-offset-card.component';

describe('ImageOffsetCardComponent', () => {
  let component: ImageOffsetCardComponent;
  let fixture: ComponentFixture<ImageOffsetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageOffsetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOffsetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
