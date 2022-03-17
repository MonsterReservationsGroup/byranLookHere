import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import fitty from 'fitty';
import { growShrink } from 'src/app/animations/grow-shrink';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

This component acts as a styled select component.
you can pass an array of values: [&#x27;a&#x27;, &#x27;b&#x27;, &#x27;c&#x27;]
or you can pass values and a set of icons: [{value: &#x27;a&#x27;, icon: &#x27;a&#x27;}, {value: &#x27;b&#x27;, icon: &#x27;b&#x27;}, {value: &#x27;c&#x27;, icon: &#x27;c&#x27;}]


********************/

@Component({
  selector: 'rafa-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [growShrink],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent implements OnInit {
  @Input('listItems') listItems: Array<interfaces.ListItem_ | string> = [];
  @Input('placeholder') placeholder: string = 'Select';
  @Output('onSelect') onSelect: EventEmitter<string> =
    new EventEmitter<string>();
  selection: string = '';
  onChange = (value: string) => value;
  onTouch = () => {};
  open = false;

  constructor() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onWrite(value: string) {
    this.select(value);
  }

  async toggle() {
    this.open = !this.open;
    await new Promise((resolve) => setTimeout(resolve, 200));
    fitty('.fit', {
      multiLine: false,
      maxSize: 12,
      minSize: 0,
    });
  }

  select(item: interfaces.ListItem_ | string) {
    const isValue = typeof item !== 'object';
    const value = isValue ? item : item.value;
    if (!isValue && item.isDisabled) return;
    console.log(item);
    this.selection = value;
    this.onChange(value);
    this.toggle();
    this.onSelect.emit(value);
  }

  ngOnInit(): void {
    this.selection = this.placeholder;
  }
}
