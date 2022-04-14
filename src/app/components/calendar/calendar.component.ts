import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { addMonths, format, subMonths, subYears } from 'date-fns';
import * as interfaces from '../../../../interfaces.d';
import { slideIn } from '../../animations/slide-in';
import * as services from '../../services';
import { SelectComponent } from '../select/select.component';
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
  @ViewChild('month') month: SelectComponent = null as any;
  @ViewChild('year') year: SelectComponent = null as any;
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
    this.render();
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  constructor(public cal: services.CaledarService, private el: ElementRef) {}

  changeMonth(e: interfaces.ListItem_) {
    const newDate = this.cal.shiftMonth(e.value);
    this.preSelect({ value: newDate });
  }

  changeYear(e: interfaces.ListItem_) {
    const newDate = this.cal.shiftYear(e.value);
    this.preSelect({ value: newDate });
    this.render();
  }

  preSelect(item: Partial<interfaces.DatepickerOption_>) {
    if (item.disabled) return;
    if (item.value) this.selectedDate = item.value;
    setTimeout(() => {
      this.render();
    }, 10);
  }

  writeValue(value: Date) {
    this.select({ value });
  }

  registerOnTouched() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  addMonth(e: any, month: SelectComponent) {
    e.stopPropagation();
    const date = addMonths(this.selectedDate, 1);
    const label = format(date, 'MMM');
    month.onWrite(label);
    const yearLabel = format(date, 'yyyy');
    this.year.onWrite(yearLabel);
    const output = {
      value: date,
      label,
      selected: false,
      disabled: false,
      icon: '',
      renderDisabledIcon: false,
    };
    this.year.onWrite(this.selectedYear);
    this.preSelect(output);
    return output;
  }

  subtractMonth(e: any, month: SelectComponent) {
    e.stopPropagation();
    const date = subMonths(this.selectedDate, 1);
    const monthLabel = format(date, 'MMM');
    const yearLabel = format(date, 'yyyy');
    this.year.onWrite(yearLabel);
    month.onWrite(monthLabel);
    const output = {
      value: date,
      label: monthLabel,
      selected: false,
      disabled: false,
      icon: '',
      renderDisabledIcon: false,
    };
    this.preSelect(output);
  }

  select(item: Partial<interfaces.DatepickerOption_>) {
    if (item.disabled) return;
    this.preSelect(item);
    this.isSelecting = false;
    this.onChange(item.value as Date);
    if (item.value) this.selectedDate = item.value;
    if (this.hasInitialized) {
      this.onSelect.emit(item.value);
    }
    this.hasInitialized = true;
  }

  toggle() {
    this.isSelecting = !this.isSelecting;
  }

  private render() {
    if (this.month?.open || this.year?.open) return;
    this.cal.currentSelection = this.selectedDate;
    this.selectedMonth = this.cal.getMonth();
    this.daysToRender = this.cal.generateCalendar(this.selectedDate);
    this.yearsToRender = this.cal.generateYears(this.startYear, this.endYear);
    this.monthsToRender = this.cal.generateMonths(this.selectedDate);
    this.selectedYear = this.selectedDate?.getFullYear().toString();
    this.monthsToRender = this.cal.generateMonths(this.selectedDate);
  }

  ngOnInit(): void {
    this.hasInitialized = false;
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
