import { TestBed } from '@angular/core/testing';
import * as interfaces from '../../../../interfaces.d';
import { StateService } from './state.service';

const testDestination = {
  description: 'test',
  destName: 'hello',
  nqDevs: [],
  photoUrl: '',
  qualifiedDevs: [],
};

const testUpsell: interfaces.Upsell_ = {
  amount: 10,
  display: 'hello',
  label: 'poop',
  editMode: false,
  selected: true,
};

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set and get the query params', () => {
    const testParams = { guestHash: '123' };
    service.queryParams = testParams;
    expect(service.queryParams).toBe(testParams);
  });

  it('Should set and get the guest', () => {
    const testGuest: Partial<interfaces.Guest_> = { age: 21 };
    service.guest = testGuest;
    expect(service.guest).toStrictEqual(testGuest);
  });

  it('Should set and get the Available Destinations', () => {
    const testAvailableDestinations: interfaces.Destinations_ = [
      testDestination,
    ];
    service.availableDestinations = testAvailableDestinations;
    expect(service.availableDestinations).toStrictEqual(
      testAvailableDestinations
    );
  });

  it('Should set and get the Selected Destination', () => {
    service.selectedDestination = testDestination;
    expect(service.selectedDestination).toStrictEqual(testDestination);
  });

  it('Should set and get the selected date', () => {
    const testDate = new Date();
    service.selectedDate = testDate;
    expect(service.selectedDate).toStrictEqual(testDate);
  });

  it('Should add an up-sell', () => {
    service.addUpsell(testUpsell);
    expect(service.upsells).toContain(testUpsell);
  });

  it('Should remove an up-sell', () => {
    service.addUpsell(testUpsell);
    service.removeUpsell(testUpsell);
    expect(service.upsells).not.toContain(testUpsell);
    expect(service.upsells).toHaveLength(0);
  });

  it('Should set and get the credit card token', () => {
    const testToken = '123' as any;
    service.creditCardToken = testToken;
    expect(service.creditCardToken).toBe(testToken);
  });

  it('Should generate a shopping cart based on the selected destination and get the cart', () => {
    const testDestination = {
      destName: 'miami',
      description: 'hello world',
    } as any;
    service.selectedDestination = testDestination;
    service.generateCart();
    const [destination, whiteGlove] = service.cart;
    expect(service.cart).toHaveLength(2);
    expect(destination.name).toContain(testDestination.destName);
    expect(destination.description).toBe(testDestination.description);
    expect(whiteGlove.name).toBe('White Glove Service');
  });

  it('Should remove an item from the cart', () => {
    service.generateCart();
    service.removeFromCart('1');
    expect(service.cart).toHaveLength(1);
  });
});
