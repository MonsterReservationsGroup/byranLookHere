import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { addDays, startOfDay } from 'date-fns';
import { createDatrix } from 'monster-datrix-engine';
import { CrmService, StateService } from '../index';

class DatrixSub {
  'existingRes' = {
    resID: 61027,
    name: 'John Test',
    spouseName: 'Jane Test',
    email: 'matthews@monsterrg.com',
    address: '170 Mockingbird Rd, Houston, Texas 77065',
    maritalStatus: 'Single Male',
    phone: '(843) 424-8619',
    age: 62,
    spouseAge: 56,
    dob: '1960-01-01',
    spouseDob: '1965-02-02',
    numInParty: 4,
    numOfAdults: 2,
    numOfChildren: 2,
    numOfNights: 3,
    income: 61000,
    occupation: 'Occupation Here',
    spouseOccupation: 'Spouse Occupation Here',
    majorCC: 'Has Major CC',
    zipCode: 77065,
    countryReally: 'United States',
    childrenAges: [],
    isTso: false,
    ownsWith: '',
    isHomeowner: 'Homeowner',
    isRetired: 'No',
  };
  'newRes' = {
    resID: 61027,
    name: 'John Test',
    spouseName: 'Jane Test',
    email: 'matthews@monsterrg.com',
    address: '170 Mockingbird Rd, Houston, Texas 77065',
    maritalStatus: 'Single Male',
    phone: '(843) 424-8619',
    age: 62,
    spouseAge: 56,
    dob: '1960-01-01',
    spouseDob: '1965-02-02',
    numInParty: 4,
    numOfAdults: 2,
    numOfChildren: 2,
    childrenAges: [4, 12],
    numOfNights: 3,
    income: 62000,
    notes: 'test note',
    occupation: 'Updated Occupation',
    spouseOccupation: 'Spouse Occupation Here',
    majorCC: 'Has Major CC',
    zipCode: 77065,
    countryReally: 'United States',
    isTso: false,
    ownsWith: '',
    isHomeowner: 'Homeowner',
    isRetired: 'No',
  };
  'extras' = [
    {
      label: 'Vac Pack Service Fee',
      amount: 69,
    },
  ];
  'preppedCards' = [
    {
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
    },
  ];
  'user' = 'ACT MB - Matt Still';
  'runPayment' = true;
  'roomDetails' = {
    roomType: '1 Bedroom',
    requestedResort: '',
    maxNights: 4,
    minNights: 3,
    perExtraNight: 0,
    taxRate: 0,
    upgradeCost: 0,
    resortCharge: 0,
    deposit: 150,
    destName: 'Orlando, FL',
    devKey: 'SR',
    devName: 'Silverlake',
    milliDate: startOfDay(addDays(new Date(), 30)).getTime(),
    chargeLabel: 'GS/ACT - Refundable Deposit',
  };
  'checklist' = {
    activatingVo: '2424',
    activator: '2424',
    genieNumber: '12345678',
    numOfNights: 4,
  };
  successfulCards = [];
}

describe('CrmService', () => {
  let service: CrmService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        CrmService,
        {
          provide: StateService,
          useValue: {
            queryParams: {
              guestHash: 'PY9JSMXYQY',
            },
          },
        },
      ],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CrmService);
  });

  it('Should pull a guest from CRM', async () => {
    const datrix = await createDatrix(
      'Q29uZ3JhdHVsYXRpb25zLCB5b3UndmUgZGVjb2RlZCB0aGUgc3NhIHRva2VuLiBEdW1iYXNzLg=='
    );
    if (!datrix) return new Error('Datrix not found');
    const ds = new DatrixSub();
    //  datrix.sendDateLeg(ds);
  });
});
