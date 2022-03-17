import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { fixNeverReadError } from '../';
import * as interfaces from '../../../../interfaces.d';
fixNeverReadError(interfaces);

declare var CollectJS: any;
/*****Description*****

private adds collect to the window object
public collects credit card info and returns token as a promise
private configures collect js to charge the card


********************/

@Injectable({
  providedIn: 'root',
})
export class NmiCollectService {
  private isInitalized = false;
  private setupInfo = {
    url: 'https://secure.networkmerchants.com/token/Collect.js',
    merchantKey: 'F65574-aCDcEk-252YHB-nnEsxa',
  };

  collectToken(amount: number) {
    if (!this.isInitalized) this.setup();
    const $token = this.configureCollectJs(amount);
    CollectJS.startPaymentRequest();
    return $token;
  }

  private setup() {
    const { url, merchantKey } = this.setupInfo;
    const collectJsTag = document.createElement('script');
    collectJsTag.setAttribute('src', url);
    collectJsTag.setAttribute('data-tokenization-key', merchantKey);
    document.body.append(collectJsTag);
    this.isInitalized = true;
  }

  private configureCollectJs(amount: number): Promise<interfaces.TokenTypeD> {
    return new Promise((resolve) => {
      CollectJS.configure({
        paymentSelector: '#customPayButton',
        buttonText: `Secure $${amount}`,
        paymentType: 'cc',
        callback: resolve,
      });
    });
  }

  getDisplayData(token: interfaces.TokenTypeD): interfaces.CardDisplay_ {
    const { card } = token;
    const { type, exp, number } = card;
    console.log(type, exp, number);
    const cardIcon = this.getCardIcon(type);
    const expirationDate = this.getExpiration(exp);
    const lastFourDigits = this.getLastFour(number);
    const lastUpdate = this.getLastUpdate();
    return {
      cardIcon,
      expirationDate,
      lastFourDigits,
      lastUpdate,
    };
  }

  private getCardIcon(cardType: interfaces.CardName) {
    const cardBasePath = '../../../assets/Cards/';
    return cardBasePath + cardType + '.png';
  }

  private getLastFour(cardNumber: string) {
    const lastFour = cardNumber.substr(cardNumber.length - 4);
    return lastFour;
  }

  private getExpiration(exp: string) {
    const expArr = Array.from(exp);
    expArr.splice(2, 0, '/');
    return expArr.join('');
  }

  private getLastUpdate() {
    const now = new Date();
    return format(now, 'd MMM y');
  }

  constructor() {}
}
