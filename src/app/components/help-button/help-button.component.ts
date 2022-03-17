import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

only shown on screens smaller than 500px
placed in lower left right hand corner of the screen
scales periodically

********************/

@Component({
  selector: 'rafa-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent implements AfterViewInit {
  timer: ReturnType<typeof setTimeout> = null as any;

  constructor(private ref: ElementRef) {}

  ngAfterViewInit() {
    this._manageShake();
  }

  private _manageShake() {
    const time = 4000;
    this.ref.nativeElement.classList.add('call-attention');
    this.timer = setInterval(() => {
      this.ref.nativeElement.classList.add('shake');
      setTimeout(() => {
        this.ref.nativeElement.classList.remove('shake');
        this.ref.nativeElement.classList.remove('call-attention');
      }, time / 2);
    }, time);
  }
}
