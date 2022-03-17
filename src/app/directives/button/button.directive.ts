import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { RafaButtonConfig_ } from '../../../../interfaces.d';
//@ts-ignore
import rawStyleVars from '../../../_vars.scss';
//@ts-ignore
import bounce from './bounce.scss';

const styleVars = parseStyles(rawStyleVars);

/*****Description*****

rounded corners
has an option to make bouncy
defaults to primary color, optional light, and inverted styles vial coloring property

********************/

@Directive({
  selector: '[rafaButton]',
})
export class ButtonDirective implements OnChanges {
  @Input('rafaButton') config: RafaButtonConfig_ | string = {} as any;

  ngOnChanges() {
    this.makeDefaultStyle();
    if (typeof this.config === 'string') return;
    const { coloring, bouncy } = this.config;
    switch (coloring) {
      case 'light':
        this.makeLightStyle();
        break;
      case 'inverted':
        this.makeInvertedStyle();
        break;
    }
    if (bouncy) this.makeBouncy();
  }

  constructor(private ref: ElementRef) {}

  private makeDefaultStyle() {
    this.ref.nativeElement.style.borderRadius = '6px';
    this.ref.nativeElement.style.padding = '10px';
    this.ref.nativeElement.style.cursor = 'pointer';
    this.ref.nativeElement.style.outline = 'none';
    this.ref.nativeElement.style.border = 'none';
    this.ref.nativeElement.style.color = '#fff';
    this.ref.nativeElement.style.fontWeight = 'bold';
    this.ref.nativeElement.style.backgroundColor = styleVars['primary-color'];
    const keyframeTag = document.createElement('style');
    keyframeTag.innerHTML = bounce;
    this.ref.nativeElement.appendChild(keyframeTag);
    this.ref.nativeElement.classList.add('button');
  }

  private makeInvertedStyle() {
    this.ref.nativeElement.style.backgroundColor = '#fff';
    this.ref.nativeElement.style.color = styleVars['primary-color'];
    this.ref.nativeElement.style.fontWeight = 'normal';
  }

  private makeLightStyle() {
    this.ref.nativeElement.style.backgroundColor = styleVars['secondary-color'];
  }

  private makeBouncy() {
    this.ref.nativeElement.classList.add('bouncy');
  }
}

function parseStyles(styles: string) {
  var regExp = /\{([^)]+)\}/;
  const cleanStyles = regExp.exec(styles);
  if (!cleanStyles) return;
  return cleanStyles![1].split(';').reduce((acc, curr) => {
    const [key, value] = curr.split(':');
    if (!key || !value) return acc;
    acc[key.split(' ').join('').split('\n').join('')] = value;
    return acc;
  }, {} as any);
}
