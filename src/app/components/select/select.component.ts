import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import fitty from 'fitty';
import { growShrink } from 'src/app/animations/grow-shrink';
import { ListItem_ } from '../../../../interfaces.d';

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
  @Input('listItems') listItems: Array<ListItem_> = [];
  @Input('placeholder') placeholder: string = 'Select';
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<string>();
  @ViewChild('list') list: any;
  selection: ListItem_ = {} as any;
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
    const item = this.listItems.find((item) => item.value === value);
    if (item) this.select(item);
  }

  async toggle(e?: any) {
    this.open = !this.open;
    await new Promise((resolve) => setTimeout(resolve, 200));
    fitty('.fit', {
      multiLine: false,
      maxSize: 12,
      minSize: 0,
    });
    const selectedEl = document.getElementsByClassName('selected')[0];
    selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  select(item: ListItem_) {
    if (item.disabled) return;
    this.selection = item;
    this.onChange(item.value);
    this.toggle();
    this.onSelect.emit(item);
  }

  ngOnInit(): void {
    this.selection = { label: this.placeholder, value: null } as any;
  }
}
