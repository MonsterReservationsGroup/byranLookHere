import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonDirective } from './directives/button/button.directive';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ImageOffsetCardComponent } from './components/image-offset-card/image-offset-card.component';
import { HeroComponent } from './components/hero/hero.component';
import { ImageCardComponent } from './components/image-card/image-card.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
