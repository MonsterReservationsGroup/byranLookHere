import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const voidState = state('void', style({ transform: 'translateX(-150%)' }));
const existsState = state('*', style({ transform: 'translateX(0)' }));

const slideInTransition = transition(
  'void => *',
  animate('0.5s 0.5s ease-out')
);

export const slideIn = trigger('slideIn', [
  voidState,
  existsState,
  slideInTransition,
]);
