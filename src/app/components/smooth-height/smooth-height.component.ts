import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component changes the height of the container smoothly when an element is removed

********************/
@Component({
  selector: 'rafa-smooth-height',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `,
  ],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition(
        '* <=> *',
        [
          style({ height: '{{startHeight}}px', opacity: 0 }),
          animate('.5s ease'),
        ],
        { params: { startHeight: 0 } }
      ),
    ]),
  ],
})
export class SmoothHeightComponent implements OnChanges {
  @Input()
  trigger: any;
  @Input() delay: number = 0;

  startHeight: number = null as any;

  @HostBinding('@grow') grow: any;

  constructor(private element: ElementRef) {}

  async execute(delay = 0) {
    if (!this.trigger) this.trigger = Math.random();
    await new Promise((resolve) => setTimeout(resolve, delay));
    this.startHeight = this.element.nativeElement.clientHeight;
    console.log(this.startHeight);
    this.grow = {
      value: this.trigger,
      params: { startHeight: this.startHeight },
    };
  }

  ngOnChanges() {
    this.execute(this.delay);
  }
}
