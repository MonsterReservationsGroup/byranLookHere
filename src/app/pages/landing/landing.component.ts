import { Component, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

This is the first step in the landing process

********************/

@Component({
  selector: 'rafa-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private timeline: services.TimelineService) {}

  ngOnInit(): void {
    this.timeline.currentIndex = 0;
    this.timeline.registerCallback(() => true);
  }


  goTo(address: string) {
    window.location.href = address;
  }
}
