import { Directive, ElementRef } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
//@ts-ignore
import inputStyle from './input.scss';
services.fixNeverReadError(interfaces);

/*****Description*****

styles the input according to rafas theme

********************/

@Directive({
  selector: '[rafaInput]',
})
export class InputDirective {
  constructor(private el: ElementRef) {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = inputStyle;
    this.el.nativeElement.appendChild(styleTag);
    this.el.nativeElement.classList.add('rafa-input');
  }
}
