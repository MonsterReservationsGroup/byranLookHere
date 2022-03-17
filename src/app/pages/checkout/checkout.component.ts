import { Component, OnInit } from '@angular/core';
import * as services from '../../services'
import * as interfaces from '../../../../interfaces.d'
services.fixNeverReadError(interfaces)

/*****Description*****

this page allows the guest to pay
********************/

@Component({
  selector: 'rafa-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
