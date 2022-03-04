import { Component, ElementRef, OnInit } from '@angular/core';
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
export class HelpButtonComponent implements OnInit {
  timer: ReturnType<typeof setTimeout> = null as any;

  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this._manageShake();
  }

  private _manageShake() {
    const time = 5000;
    this.timer = setInterval(() => {
      this.ref.nativeElement.classList.add('shake');
      setTimeout(() => {
        this.ref.nativeElement.classList.remove('shake');
      }, time / 2);
    }, time);
  }
}
