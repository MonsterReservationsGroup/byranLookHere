import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component puts together an input and an optional label

********************/

@Component({
  selector: 'rafa-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements OnInit {
  @Input('label') label: string = '';
  @Input('chips') chips: { label: string; value: number }[] = [];
  @Input('error') error = '';
  value = '';
  focused = false;
  onChange = (value: string) => null;
  id = `rafa-input-${Math.floor(Math.random() * 99999999999999)}`;
  onTouched = () => {};
  constructor() {}

  onFocus(el: HTMLInputElement) {
    this.focused = true;
    setTimeout(() => {
      el.select();
    }, 10);
  }

  setValue(value: string) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onInputBlur() {
    this.focused = false;
    this.onTouched();
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  writeValue(obj: string, flag?: boolean): void {
    if (flag) {
    }
    this.setValue(obj);
  }

  ngOnInit(): void {}
}
