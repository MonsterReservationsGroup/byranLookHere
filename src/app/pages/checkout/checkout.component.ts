import { Component, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this page allows the guest to pay
********************/

@Component({
  selector: 'rafa-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private state: services.StateService,
    private crm: services.CrmService
  ) {}

  ngOnInit(): void {}

  async finalize() {
    this.crm.submitDateleg(await this.crm.guest);
  }
}
