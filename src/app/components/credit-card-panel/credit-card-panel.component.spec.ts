import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardPanelComponent } from './credit-card-panel.component';

describe('CreditCardPanelComponent', () => {
  let component: CreditCardPanelComponent;
  let fixture: ComponentFixture<CreditCardPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCardPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
