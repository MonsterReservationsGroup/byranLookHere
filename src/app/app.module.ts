import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonDirective } from './directives/button/button.directive';

@NgModule({
  declarations: [AppComponent, TestPageComponent, NavBarComponent, ButtonDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
