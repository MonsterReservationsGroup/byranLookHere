import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { subYears } from 'date-fns';
import * as interfaces from '../../../../interfaces.d';
import { slideIn } from '../../animations/slide-in';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

takes a default day
allows you to pick a month
allows you to pick a year
generates a grid with the days of the month
allows you to select a day

********************/

@Component({
  selector: 'rafa-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [slideIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CalendarComponent,
    },
  ],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input('label') label: string = '';
  @Input('validation') valudation = (date: Date) => false;
  @Input('headless') headless: boolean = false;
  hasInitialized = false;
  isSelecting = false;
  daysToRender = [] as any[];
  yearsToRender = [] as any[];
  monthsToRender = [] as any[];
  selectedYear = '';
  selectedMonth = '';
  @Input('defaultDate') defaultDate = new Date();
  @Input('startYear') startYear = subYears(new Date(), 80);
  @Input('endYear') endYear = new Date();
  selectedDate = null as unknown as Date;
  headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  onChange = (value: Date) => {};
  @Output('onSelect') onSelect = new EventEmitter();

  ngOnChanges() {
    this.cal.registerValidation(this.valudation);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  constructor(public cal: services.CaledarService, private el: ElementRef) {}

  changeMonth(e: interfaces.ListItem_) {
    console.log('ran month');
    const newDate = this.cal.shiftMonth(e.value);
    this.preSelect({ value: newDate });
  }

  changeYear(e: interfaces.ListItem_) {
    console.log('ran year');
    const newDate = this.cal.shiftYear(e.value);
    this.preSelect({ value: newDate });
    this.render();
  }

  preSelect(item: Partial<interfaces.DatepickerOption_>) {
    if (item.disabled) return;
    if (item.value) this.selectedDate = item.value;
    this.render();
  }

  writeValue(value: Date) {
    this.select({ value });
  }

  registerOnTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  select(item: Partial<interfaces.DatepickerOption_>) {
    if (item.disabled) return;
    this.preSelect(item);
    this.isSelecting = false;
    this.onChange(item.value as Date);
    if (item.value) this.selectedDate = item.value;
    if (this.hasInitialized) {
      console.log('emitting');
      this.onSelect.emit(item.value);
    }
    this.hasInitialized = true;
  }

  toggle() {
    this.isSelecting = !this.isSelecting;
  }

  private render() {
    this.selectedMonth = this.cal.getMonth();
    this.cal.currentSelection = this.selectedDate;
    this.daysToRender = this.cal.generateCalendar(this.selectedDate);
    this.yearsToRender = this.cal.generateYears(this.startYear, this.endYear);
    this.monthsToRender = this.cal.generateMonths(this.selectedDate);
    this.selectedYear = this.selectedDate.getFullYear().toString();
    this.monthsToRender = this.cal.generateMonths(this.selectedDate);
  }

  ngOnInit(): void {
    this.select({ value: this.defaultDate });
    setInterval(() => {
      const selection = this.el.nativeElement.getElementsByClassName(
        'date-picker__date--selected'
      )[0];
      if (!selection) return;
      selection.classList.add('date-picker__date--selected-animation');
      setTimeout(() => {
        selection.classList.remove('date-picker__date--selected-animation');
      }, 1000);
    }, 5000);
  }
}
