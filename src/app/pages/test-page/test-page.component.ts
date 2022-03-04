import { Component, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****
this is a page that allows for testing of individual components
********************/

@Component({
  selector: 'rafa-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
