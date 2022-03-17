import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const voidState = state('void', style({ height: '0px', opacity: 0 }));
const existsState = state('*', style({ height: '*' }));

const slideInTransition = transition(
  'void => *',
  animate(
    '0.3s ease-in-out',
    keyframes([
      style({ height: '0px', opacity: 0, offset: 0 }),
      style({ height: '0px', opacity: 1, offset: 0.2 }),
      style({ height: '*', opacity: 1, offset: 1 }),
    ])
  )
);

const slideOutTransition = transition(
  '* => void',
  animate(
    '0.5s ease-in-out',
    keyframes([
      style({ height: '*', opacity: 1, offset: 0 }),
      style({ transform: 'translateY(40px)', opacity: 0, offset: 1 }),
    ])
  )
);

export const growShrink = trigger('growShrink', [
  // voidState,
  // existsState,
  slideInTransition,
  slideOutTransition,
]);
