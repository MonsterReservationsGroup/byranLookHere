import { Component, OnInit } from '@angular/core';
import * as services from '../../services'
import * as interfaces from '../../../../interfaces.d'
services.fixNeverReadError(interfaces)

/*****Description*****


********************/

@Component({
  selector: 'rafa-matts-test-page',
  templateUrl: './matts-test-page.component.html',
  styleUrls: ['./matts-test-page.component.scss']
})
export class MattsTestPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
