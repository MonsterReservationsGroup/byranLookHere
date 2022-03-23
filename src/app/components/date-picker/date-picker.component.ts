import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { eachYearOfInterval, getDaysInMonth, subYears } from 'date-fns';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
import data from './data.json';
services.fixNeverReadError(interfaces);

/*****Description*****

three selects, month day year
day is disabled if no month
when month is selected it generates all days for that month
outputs a standard javascript date object



********************/

@Component({
  selector: 'rafa-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatePickerComponent,
    },
  ],
})
export class DatePickerComponent implements OnInit {
  [key: string]: any;
  daysOfTheWeek = data.daysOfTheWeek;
  months = data.months;
  years = null as any;
  days = null as any;
  private selectedDay = 0;
  private selectedMonth = '';
  private selectedYear = 0;
  _outputDate = null as unknown as Date;
  private onChange = (value: any) => console.log(value);
  isSelecting = false;
  private _reset = true;
  @Input('validation') validation: (
    day: number,
    month: string,
    year: number
  ) => null | string = (d, m, y) => null;
  @Input('headless') headless = false;
  @Input('label') label = data.defaultLabel;
  @Output('onChange') onChangeEmitter = new EventEmitter<Date>();
  get reset() {
    return this._reset;
  }

  set reset(value: boolean) {
    this._reset = false;
    new Promise((r) => setTimeout(r, 0)).then(() => {
      this._reset = true;
    });
  }

  toggle() {
    this.isSelecting = !this.isSelecting;
  }

  async resetValue() {
    this.reset = true;
    this.selectedDay = 0;
    this.selectedMonth = '';
    this.days = null;
    this.selectedYear = 0;
  }

  get outputDate() {
    return this._outputDate;
  }

  set outputDate(value: Date) {
    if (!value) return;
    this._outputDate = value;
    this.onChange(value);
    this.isSelecting = false;
    this.resetValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: any) {
    this.outputDate = value;
  }

  registerOnTouched() {}

  constructor() {}

  attemptSelect(value: string, type: string) {
    this[type] = value;
    this.createDaySeed();
    const { selectedDay, selectedMonth, selectedYear } = this;
    const date = new Date(`${selectedMonth} ${selectedDay}, ${selectedYear}`);
    const badDate = date.toString() === 'Invalid Date';
    const allSelected = !!selectedDay && !!selectedMonth && !!selectedYear;
    const notValid = badDate || !allSelected;
    console.log({
      value,
      type,
      notValid,
      date: date.toString(),
      allSelected,
      selectedDay,
      selectedMonth,
      selectedYear,
    });
    if (notValid) return;
    this.outputDate = date;
  }

  ngOnInit(): void {
    this.years = this.createYearSeed();
  }

  createDaySeed() {
    const { selectedMonth, selectedYear } = this;
    if (!selectedYear || !selectedMonth) return null;
    const rawDays = getDaysInMonth(
      new Date(`${selectedMonth} 1, ${selectedYear}`)
    );
    let days = [];
    for (let i = 1; i <= rawDays; i++) {
      days.push(i);
    }

    this.days = days.map((day: number) => {
      const validationOutput = this.validation(
        day,
        selectedMonth,
        selectedYear
      );
      if (validationOutput) {
        return {
          value: validationOutput,
          isDisabled: true,
        };
      }
      return day;
    });
    return days;
  }

  createYearSeed() {
    const now = new Date();
    const interval = {
      start: subYears(now, 80),
      end: now,
    };
    const allRawYears = eachYearOfInterval(interval);
    const allYears = allRawYears.map((year) => year.getFullYear());
    return allYears;
  }
}
