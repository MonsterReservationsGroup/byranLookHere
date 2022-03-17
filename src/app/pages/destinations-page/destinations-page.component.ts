import { Component, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

 this allows the guest to select a destination
********************/

@Component({
  selector: 'rafa-destinations-page',
  templateUrl: './destinations-page.component.html',
  styleUrls: ['./destinations-page.component.scss'],
})
export class DestinationsPageComponent implements OnInit {
  destinationPicked = false;

  constructor() {}

  ngOnInit(): void {}
}
