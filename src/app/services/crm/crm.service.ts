import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createDatrix } from 'monster-datrix-engine';
import { lastValueFrom, take, tap } from 'rxjs';
import { StateService } from '..';
import * as interfaces from '../../../../interfaces.d';

/*****Description*****

get a guest based on hash
set a guest based on the sale


********************/
const sample_checklist = {
  accountNumber: '',
  ficoChecked: false,
  genieNumber: '12345678',
  activator: '2424',
  activatingVo: '2424',
  optionalNotes: 'test note',
  numOfNights: 3,
  textToDeveloper: '',
};

const sample_card = {
  token: {
    cardType: 'visa',
    cardExp: '1025',
    lastFour: '1111',
    token: 'test token',
  },
  billingInfo: {
    address1: 'PO Box 100',
    city: 'Myrtle Beach',
    first_name: 'Test Pass 1',
    last_name: '',
    state: 'South Carolina',
    zip: '29587',
    salesOffice: 'ACT MB',
  },
  amount: 219,
  recurring: false,
};

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  getReservationEndpoint =
    'https://us-central1-crm-sdk.cloudfunctions.net/getReservation';
  requestedFields = [
    'resID',
    'name',
    'spouseName',
    'email',
    'address',
    'maritalStatus',
    'phone',
    'age',
    'spouseAge',
    'dob',
    'spouseDob',
    'numInParty',
    'numOfAdults',
    'numOfChildren',
    'numOfNights',
    'income',
    'occupation',
    'spouseOccupation',
    'majorCC',
    'zipCode',
    'countryReally',
    'isTso',
    'ownsWith',
    'childrenAges',
  ];
  test = 'palantir';
  datrix = createDatrix('VGhpcyBpcyBhIHNlcnZpY2UgdG9rZW4uIEl0J3MgMzcu');
  previousGuest = {} as any;
  constructor(private state: StateService, private http: HttpClient) {}

  // get a guest based on hash, returns a promise;
  get guest(): Promise<interfaces.Guest_> {
    const { getReservationEndpoint, requestedFields, test } = this;
    // guestHash is undefined, using John Test as the default value
    const hash = this.state.queryParams?.guestHash || 'PY9JSMXYQY';
    const payload = JSON.stringify({
      test,
      hash,
    });
    const $guest = this.http.post(getReservationEndpoint, payload).pipe(
      tap((previousGuest) => {
        this.previousGuest = previousGuest;
      }),
      take(1)
    );
    return lastValueFrom($guest) as any;
  }

  async getActiveCategories(guest: any) {
    const datrix = await this.datrix;
    return datrix.getActiveCategories(guest);
  }

  async checkSingleDate(location: string, date: string, guest: any) {
    const datrix = await this.datrix;
    return datrix.checkSingleDate(location, date, guest);
  }

  async submitDateleg(newRes: any, roomDetails: any) {
    const datrix = await this.datrix;
    datrix.sendDateLeg({
      existingRes: this.previousGuest,
      newRes,
      checklist: sample_checklist,
      extras: [],
      preppedCards: [sample_card],
      roomDetails,
      runPayment: true,
      successfulCards: [],
      user: 'Datrix Engine Test',
    });
  }
}
