import { Injectable } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

  sets/gets query parameters
  sets/gets guest fully or partially
  sets/gets available destinations
  sets/gets a selected destination
  sets/gets a selected date
  adds an upsell
  removes an upsell
  gets all upsells
  generates a cart
  removes an element from the cart

********************/

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _queryParams: interfaces.QueryParams_ = null as any;
  private _guest: interfaces.Guest_ = {} as any;
  private _availableDestinations: interfaces.Destinations_ = [];
  private _selectedDestination: interfaces.Destination_ = null as any;
  private _selectedDate: any = null as any;
  private _upsells: interfaces.Upsell_[] = [];
  private _creditCardToken: interfaces.TokenTypeD = null as any;
  private _cart: Array<interfaces.CartItem_> = [];

  constructor() {}

  set creditCardToken(token: interfaces.TokenTypeD) {
    this._creditCardToken = token;
  }

  get creditCardToken(): interfaces.TokenTypeD {
    return this._creditCardToken;
  }

  set queryParams(queryParams: interfaces.QueryParams_) {
    this._queryParams = queryParams;
  }

  get queryParams(): interfaces.QueryParams_ {
    return this._queryParams;
  }

  set guest(guest: Partial<interfaces.Guest_>) {
    Object.assign(this._guest, guest);
  }

  get guest(): interfaces.Guest_ {
    return this._guest;
  }

  set availableDestinations(destinations: interfaces.Destinations_) {
    this._availableDestinations = destinations;
  }

  get availableDestinations(): interfaces.Destinations_ {
    return this._availableDestinations;
  }

  set selectedDestination(destination: interfaces.Destination_) {
    this._selectedDestination = destination;
  }

  get selectedDestination(): interfaces.Destination_ {
    return this._selectedDestination;
  }

  set selectedDate(date: any) {
    this._selectedDate = date;
  }

  get selectedDate(): any {
    return this._selectedDate;
  }

  get upsells(): interfaces.Upsell_[] {
    return this._upsells;
  }

  addUpsell(upsell: interfaces.Upsell_) {
    this._upsells.push(upsell);
  }

  removeUpsell(upsell: interfaces.Upsell_) {
    this._upsells = this._upsells.filter(
      (upsell_) => JSON.stringify(upsell_) !== JSON.stringify(upsell)
    );
  }

  generateCart() {
    const whiteGlove: interfaces.CartItem_ = {
      id: '1',
      description:
        'Now offering a peace of mind option! We know life happens, so in order to protect you from rescheduling fees, we created White Glove Service! This service protects your deposit, allows you to reschedule dates, and you also receive a Travel Guide Ebook all about the destination you are traveling too!',
      icon: '../../../assets/cart/flip-flops.png',
      isRemovable: true,
      isRemoved: false,
      name: 'White Glove Service',
      price: 99,
    };
    const destination: interfaces.CartItem_ = {
      id: '2',
      description: `The $150 refundable deposit ensures your accomodations are secured. Check-in Date: ${new Date(
        this.selectedDate.milliDate
      )?.toLocaleDateString()}`,
      icon: '../../../assets/cart/vacations.svg',
      isRemoved: false,
      isRemovable: false,
      name: `Activation! ${this.selectedDestination?.destName || 'lorum'}`,
      price: 150,
    };
    this._cart = [destination, whiteGlove];
    return this._cart;
  }

  get cart() {
    return this._cart;
  }

  removeFromCart(id: string) {
    console.log(id);
    this._cart = this.cart.map((item) => {
      if (item.id === id) {
        item.isRemoved = true;
      }
      return item;
    });
  }
}
