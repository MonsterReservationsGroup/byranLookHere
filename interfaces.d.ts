export * from './src/app/services/nmi-collect/tokenType.d';
import {
  DatrixCharge,
  DestinationSelectionRoot_,
  ReservationObject,
} from 'monster-datrix-engine';
import { CaledarService } from './src/app/services';
export type Guest_ = ReservationObject;
export type Destinations_ = DestinationSelectionRoot_[];
export type Destination_ = DestinationSelectionRoot_;
export type Upsell_ = DatrixCharge;
export interface QueryParams_ {
  guestHash?: string;
}
export interface RafaButtonConfig_ {
  bouncy?: boolean;
  coloring?: 'light' | 'inverted';
}
export type NextRouteCallback_ = () => boolean;
export interface Link_ {
  url: string;
  text: string;
}
export interface CardDisplay_ {
  cardIcon: string;
  expirationDate: string;
  lastFourDigits: string;
  lastUpdate: string;
}
export interface CartItem_ {
  id: string;
  name: string;
  icon: string;
  description: string;
  isRemovable: boolean;
  isRemoved: boolean;
  price: number;
}
export interface MaritalButton_ {
  value: string;
  blurb: string;
  selected: boolean;
}
export interface ListItem_ {
  label: string;
  value: any;
  disabled?: boolean;
  icon: string;
}
export interface DatepickerOption_ {
  value: Date;
  label: string;
  selected: boolean;
  disabled: boolean;
  renderDisabledIcon: boolean;
  callback?: (calendar: CaledarService) => void;
}
