import { animate, style, transition, trigger } from '@angular/animations';

const slideInTransition = transition('void => *', [
  style({ transform: 'translateX(-150%)' }),
  animate('0.5s 0.5s ease-out', style({ transform: 'translateX(0)' })),
]);

const slideOutTransition = transition('* => void', [
  style({ transform: 'translateX(0)' }),
  animate('0.5s 0.5s ease-out', style({ transform: 'translateX(150%)' })),
]);

export const slideInOut = trigger('slideInOut', [
  slideInTransition,
  slideOutTransition,
]);
