import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { slideIn } from 'src/app/animations/slide-in';
import * as interfaces from '../../../../interfaces.d';
import {
  fixNeverReadError,
  NmiCollectService,
  StateService,
} from '../../services';

fixNeverReadError(interfaces);

/*****Description*****

displays the type as an icon
displays the last 4
displays the expiration
has a button to add / edit the credit card
defaults to 'add card button'

********************/

@Component({
  selector: 'rafa-credit-card-panel',
  templateUrl: './credit-card-panel.component.html',
  styleUrls: ['./credit-card-panel.component.scss'],
  animations: [slideIn],
})
export class CreditCardPanelComponent implements AfterViewInit {
  token: interfaces.TokenTypeD = null as any;
  icon: string = null as any;
  lastFour: string = null as any;
  display: interfaces.CardDisplay_ = {} as any;
  @Output('onAddCard') onAddCard = new EventEmitter();

  constructor(private state: StateService, private nmi: NmiCollectService) {} async collectPaymentInformation() { const amount = this.state.getTotal();
    this.display = {} as any;
    this.token = await this.nmi.collectToken(amount);
    this.state.creditCardToken = this.token;
    this.display = this.nmi.getDisplayData(this.token);
    await new Promise((resolve) => setTimeout(resolve, 1));
    this.onAddCard.emit(this.token);
  }

  ngAfterViewInit() {}
}
