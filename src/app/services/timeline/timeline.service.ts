import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this service handles the flow of the app
current index keeps track of the current page
callback is a function that is called when the next method is called,
if it returns false the goToNextRoute is not called
goes to the next route
goes to the previous route

********************/

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  routes: Array<string> = [];
  currentIndex: number = 0;
  callback: interfaces.NextRouteCallback_ = () => true;

  registerCallback(callback: interfaces.NextRouteCallback_) {
    this.callback = callback;
  }

  next() {
    if (!this.callback()) return;
    this.incrementIndex();
    this.goToRoute();
  }

  back() {
    this.decrementIndex();
    this.goToRoute();
  }

  private goToRoute() {
    this.route.navigate([this.routes[this.currentIndex]]);
  }

  private incrementIndex() {
    this.currentIndex++;
    if (this.currentIndex >= this.routes.length) {
      this.currentIndex = 0;
    }
  }

  private decrementIndex() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
  }

  constructor(private route: Router) {}
}
