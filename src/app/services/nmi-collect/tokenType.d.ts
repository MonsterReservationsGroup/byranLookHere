export interface TokenTypeD {
  tokenType: string;
  token: string;
  card: Card;
  check: Check;
  wallet: Wallet;
  amount: number;
  recurring: false;
}

export type CardName = 'visa' | 'mastercard' | 'discover' | 'amex';

export interface Card {
  number: string;
  bin: string;
  exp: string;
  hash: string;
  type: CardName;
}

export interface Check {
  name: null;
  account: null;
  hash: null;
  aba: null;
}

export interface Wallet {
  cardDetails: null;
  cardNetwork: null;
  email: null;
  billingInfo: IngInfo;
  shippingInfo: IngInfo;
}

export interface IngInfo {
  address1: null;
  address2: null;
  firstName: null;
  lastName: null;
  postalCode: null;
  city: null;
  state: null;
  country: null;
  phone: null;
}
