import {
  DatrixCharge,
  DestinationSelectionRoot_,
  ReservationObject,
} from 'monster-datrix-engine';
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
