import { animate, style, transition, trigger } from '@angular/animations';

const fadeInTransition = transition('void => *', [
  style({ opacity: 0 }),
  animate('0.5s 0.5s ease-out', style({ opacity: 1 })),
]);

const fadeOutTransition = transition('* => void', [
  style({ opacity: 1 }),
  animate('0.5s 0.5s ease-out', style({ opacity: 0 })),
]);

export const fadeInOut = trigger('fadeInOut', [
  fadeInTransition,
  fadeOutTransition,
]);
