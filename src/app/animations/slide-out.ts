import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

// const voidState = state('void', style({ transform: 'translateX(-150%)' }));
// const existsState = state('*', style({ transform: 'translateX(0) ' }));

const slideInTransition = transition(
  '* => void',
  animate(
    '0.7s ease-out',
    keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-150%)', offset: 0.5 }),
    ])
  )
);

export const slideOut = trigger('slideOut', [slideInTransition]);
