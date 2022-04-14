import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****


********************/

@Component({
  selector: 'rafa-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberPickerComponent,
    },
  ],
})
export class NumberPickerComponent implements OnInit {
  @Input() label = 'Adults';
  onChange = (value: any) => {};
  number = 0;

  add() {
    this.number += 1;
    this.onChange(this.number);
  }

  subtract() {
    if (this.number > 0) this.number -= 1;
    this.onChange(this.number);
  }

  writeValue(value: string) {
    const num = parseInt(value, 10);
    this.number = isNaN(num) ? 0 : num;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched() {}

  constructor() {}

  ngOnInit(): void {}
}
