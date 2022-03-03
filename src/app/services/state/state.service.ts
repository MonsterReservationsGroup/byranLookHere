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

********************/

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _queryParams: interfaces.QueryParams_ = null as any;
  private _guest: interfaces.Guest_ = {} as any;
  private _availableDestinations: interfaces.Destinations_ = [];
  private _selectedDestination: interfaces.Destination_ = null as any;
  private _selectedDate: Date = null as any;
  private _upsells: interfaces.Upsell_[] = [];

  constructor() {}

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

  set selectedDate(date: Date) {
    this._selectedDate = date;
  }

  get selectedDate(): Date {
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
}
