import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createDatrix } from 'monster-datrix-engine';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom, shareReplay, take, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { StateService } from '..';
import * as interfaces from '../../../../interfaces.d';

type Unix_Epoch = number;

/*****Description*****

get a guest based on hash
set a guest based on the sale


********************/
const sample_checklist = {
  accountNumber: '',
  ficoChecked: false,
  genieNumber: '12345678',
  activator: '8227',
  activatingVo: '8227',
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
  datrix = createDatrix(
    'Q29uZ3JhdHVsYXRpb25zLCB5b3UndmUgZGVjb2RlZCB0aGUgc3NhIHRva2VuLiBEdW1iYXNzLg=='
  );
  constructor(
    private state: StateService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  // get a guest based on hash, returns a promise;
  getGuest(): Promise<interfaces.Guest_> {
    this.spinner.show();
    const { getReservationEndpoint, requestedFields, test } = this;
    // guestHash is undefined, using John Test as the default value
    const hash = this.state.queryParams?.guestHash || 'PY9JSMXYQY';
    const payload = JSON.stringify({
      test,
      hash,
    });
    const $guest = this.http.post(getReservationEndpoint, payload).pipe(
      shareReplay(),
      take(1),
      tap((guest) => {
        this.spinner.hide();
        this.state.guest = guest;
        this.state.originalGuest = JSON.parse(JSON.stringify(guest));
      })
    );

    return lastValueFrom($guest) as any;
  }

  async getActiveCategories(guest: interfaces.Guest_) {
    const datrix = await this.datrix;
    return datrix.getActiveCategories(guest);
  }

  async getDestinations(guest: interfaces.Guest_) {
    const datrix = await this.datrix;
    const output = datrix.getDestinations(guest);
    return output;
  }

  async checkSingleDate(
    location: string,
    date: string,
    guest: interfaces.Guest_
  ) {
    const datrix = await this.datrix;
    return datrix.checkSingleDate(location, date, guest);
  }

  async getCalendar(
    destination: string,
    dateStart: Unix_Epoch,
    dateEnd: Unix_Epoch,
    guest: interfaces.Guest_
  ) {
    console.log({
      destination,
      dateStart,
      dateEnd,
      guest,
    });
    const datrix = await this.datrix;
    const output = datrix.getDateRange(destination, dateStart, dateEnd, guest);
    console.log({ output });
    return output;
  }

  async submitDateleg(newRes: interfaces.Guest_) {
    const token = this.state.creditCardToken;
    //@ts-ignore
    token.token = {
      cardType: token.card.type,
      cardExp: token.card.exp,
      lastFour: token.card.number.substr(-4),
      token: token.token,
    };
    token.amount = this.state.getTotal();
    token.recurring = false;
    let first_name = '';
    let last_name = '';
    if (
      !this.state.guest.name.includes('Test') &&
      !this.state.guest.name.includes('1')
    ) {
      first_name = this.state.guest.name.split(' ')[0];
      last_name = this.state.guest.name.split(' ')[1];
    } else {
      first_name = this.state.guest.name;
    }
    //@ts-ignore
    token.billingInfo = {
      address1: this.state.guest.address1,
      city: this.state.guest.city,
      first_name,
      last_name,
      state: this.state.guest.state,
      zip: this.state.guest.zipCode,
      salesOffice: this.state.guest.salesOffice,
    };
    console.log({ token });
    this.spinner.show();
    const datrix = await this.datrix;
    const roomDetails = this.state.selectedDate.availableRoomTypes[0];
    console.log({ roomDetails, newRes });
    const result = await datrix.sendDateLeg({
      existingRes: this.state.originalGuest,
      newRes,
      checklist: sample_checklist,
      extras: [],
      preppedCards: [token as any],
      roomDetails,
      runPayment: true,
      successfulCards: [],
      user: 'Datrix Engine Test',
    });
    console.log({ result });
    this.spinner.hide();

    if (result.crmStatus && result.paymentStatus) {
      await Swal.fire({
        title: 'Success!',
        text: 'Whohooo! Your reservation has been submitted. You are ready to go on Vacation!',
        icon: 'success',
        confirmButtonText: 'OK',
        footer: 'Click `OK` to check out our website',
        confirmButtonColor: '#22931f',
      });
      window.location.href = 'https://monsterrg.com/';
      return;
    } else if (!result.crmStatus) {
      await Swal.fire({
        title: 'Card Declined!',
        text: 'Please try again',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22931f',
      });
      return;
    } else {
      await Swal.fire({
        title: 'Sorry!',
        text: 'Your package could not be created, please try again',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#22931f',
      });
      return;
    }
  }
}
