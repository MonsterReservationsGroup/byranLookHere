import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreditCardPanelComponent } from './components/credit-card-panel/credit-card-panel.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { HeroComponent } from './components/hero/hero.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ImageOffsetCardComponent } from './components/image-offset-card/image-offset-card.component';
import { InputComponent } from './components/input/input.component';
import { MaritalSelectComponent } from './components/marital-select/marital-select.component';
import { MaskComponent } from './components/mask/mask.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { QualificationsFormComponent } from './components/qualifications-form/qualifications-form.component';
import { SelectComponent } from './components/select/select.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SmoothHeightComponent } from './components/smooth-height/smooth-height.component';
import { ButtonDirective } from './directives/button/button.directive';
import { InputDirective } from './directives/input/input.directive';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DestinationsPageComponent } from './pages/destinations-page/destinations-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MattsTestPageComponent } from './pages/matts-test-page/matts-test-page.component';
import { QualificationsPageComponent } from './pages/qualifications-page/qualifications-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { CartTotalPipe } from './pipes/cart-total/cart-total.pipe';
import { DateFormatterPipe } from './pipes/date-formatter/date-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    NavBarComponent,
    ButtonDirective,
    HelpButtonComponent,
    ImageOffsetCardComponent,
    HeroComponent,
    ImageCardComponent,
    CreditCardPanelComponent,
    ShoppingCartComponent,
    CartTotalPipe,
    SmoothHeightComponent,
    QualificationsFormComponent,
    MaritalSelectComponent,
    SelectComponent,
    MattsTestPageComponent,
    LandingComponent,
    QualificationsPageComponent,
    InputDirective,
    InputComponent,
    DatePickerComponent,
    DestinationsPageComponent,
    CheckoutComponent,
    DateFormatterPipe,
    CalendarComponent,
    MaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
