import {
  NgSignaturePadOptions,
  SignaturePadComponent,
} from '@almothafar/angular-signature-pad';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('signature')
  public signaturePad: SignaturePadComponent = null as any;

  signaturePadOptions: NgSignaturePadOptions = {
    // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
    backgroundColor: '#fff',
    penColor: '#22931f',
  };
  constructor(
    public state: services.StateService,
    private crm: services.CrmService,
    private timeline: services.TimelineService
  ) {}

  ngOnInit(): void {
    this.timeline.currentIndex = 3;
  }

  saveCard(e: any) {
    this.state.creditCardToken = e;
  }

  async finalize() {
    this.crm.submitDateleg(this.state.guest);
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    this.state.signature = this.signaturePad.toDataURL();
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

  ngAfterViewInit() {
    this.state.guest['paymentMethod'] = 'creditCard';
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
}
