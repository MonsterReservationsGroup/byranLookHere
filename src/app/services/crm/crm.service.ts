import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { StateService } from '..';
import * as interfaces from '../../../../interfaces.d';

/*****Description*****

get a guest based on hash
set a guest based on the sale


********************/

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
  constructor(private state: StateService, private http: HttpClient) {}

  // get a guest based on hash, returns a promise;
  get guest(): Promise<interfaces.Guest_> {
    const { getReservationEndpoint, requestedFields, test } = this;
    const { guestHash: hash } = this.state.queryParams;
    const $guest = this.http
      .post(getReservationEndpoint, {
        test,
        requestedFields,
        hash,
      })
      .pipe(take(1));
    return lastValueFrom($guest) as any;
  }
}
