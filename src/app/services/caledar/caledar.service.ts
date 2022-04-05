import { Injectable } from '@angular/core';
import {
  eachYearOfInterval,
  getDate,
  getDaysInMonth,
  nextSaturday,
  previousSunday,
} from 'date-fns';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

provides all headless functions for the date picker
generate months
generate years
generate days for month-year
get the days between last sunday of last month and first day of this month
get the days between the first saturday of next month and the last day of this month


********************/

@Injectable({
  providedIn: 'root',
})
export class CaledarService {
  _currentSelection = new Date();
  validation = (date: Date) => false;
  private _monthSeeds = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  registerValidation(validation: (date: Date) => boolean) {
    this.validation = validation;
  }

  set currentSelection(date: Date) {
    this._currentSelection = date;
  }

  select(list: interfaces.DatepickerOption_[], value: Date) {
    list.forEach((item) => {
      if (item.value === value) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
  }

  constructor() {}

  getMonth() {
    try {
      return this._monthSeeds[this._currentSelection.getMonth()];
    } catch {
      return this._monthSeeds[new Date().getMonth()];
    }
  }

  generateBeginingDays(defaultDate: Date): interfaces.DatepickerOption_[] {
    if (this._currentSelection) {
    }
    const workingDate = new Date(
      this._currentSelection?.getFullYear(),
      this._currentSelection?.getMonth(),
      1
    );
    const lastSundayOfLastMonth = previousSunday(workingDate);
    const daysInMonth = getDaysInMonth(lastSundayOfLastMonth);
    const output: interfaces.DatepickerOption_[] = [] as any;
    let index = daysInMonth - lastSundayOfLastMonth.getDate();
    while (output.length <= index) {
      const value = new Date(
        this._currentSelection?.getFullYear(),
        this._currentSelection?.getMonth(),
        lastSundayOfLastMonth?.getDate() + output.length
      );
      const renderDisabledIcon = this.validation(value);
      output.push({
        value,
        label: value.getDate().toString(),
        selected: false,
        disabled: true || renderDisabledIcon,
        renderDisabledIcon,
      });
    }
    return output;
  }

  generateEndDays(defaultDate: Date) {
    const daysInMonth = getDaysInMonth(defaultDate);
    const workingDate = new Date(
      this._currentSelection?.getFullYear(),
      this._currentSelection?.getMonth(),
      daysInMonth
    );

    const firstSaturdayOfNextMonth = nextSaturday(workingDate);
    const output: interfaces.DatepickerOption_[] = [] as any;
    let index = 1;
    for (let index = 1; firstSaturdayOfNextMonth.getDate() >= index; index++) {
      const value = new Date(
        this._currentSelection?.getFullYear(),
        this._currentSelection?.getMonth(),
        index
      );
      const renderDisabledIcon = this.validation(value);
      output.push({
        value,
        label: value.getDate().toString(),
        selected: false,
        disabled: true || renderDisabledIcon,
        renderDisabledIcon,
      });
    }
    return output;
  }

  generateCalendar(defaultDate: Date) {
    const output: interfaces.DatepickerOption_[] = [];
    const before = this.generateBeginingDays(defaultDate);
    const after = this.generateEndDays(defaultDate);
    const days = this.generateDays(defaultDate);
    output.push(...before, ...days, ...after);
    return output;
  }

  shiftYear(date: Date) {
    const day = getDate(this._currentSelection);
    const outDef = new Date(
      date?.getFullYear(),
      this._currentSelection.getMonth(),
      day
    );
    this._currentSelection = outDef;
    return outDef;
  }

  generateYears(
    start: Date,
    end: Date,
    defaultDate?: Date
  ): interfaces.DatepickerOption_[] {
    const interval = {
      start,
      end,
    };
    if (defaultDate) this.shiftYear(defaultDate);
    const allRawYears = eachYearOfInterval(interval);
    const output = allRawYears.map((year) => {
      const output: interfaces.DatepickerOption_ = {
        value: year,
        label: year.getFullYear()?.toString(),
        selected: year?.getFullYear() === this._currentSelection?.getFullYear(),
        disabled: false,
        renderDisabledIcon: false,
      };
      return output;
    });
    return output;
  }

  shiftMonth(date: Date) {
    const day = getDate(this._currentSelection);
    const outDef = new Date(
      this._currentSelection?.getFullYear(),
      date.getMonth(),
      day
    );
    this._currentSelection = outDef;
    return outDef;
  }

  generateMonths(defaultDate?: Date): interfaces.DatepickerOption_[] {
    if (defaultDate) this.shiftMonth(defaultDate);
    const output = this._monthSeeds.map((month, index) => {
      const output: interfaces.DatepickerOption_ = {
        value: new Date(
          this._currentSelection?.getFullYear(),
          index,
          getDate(this._currentSelection)
        ),
        label: month,
        selected: index === this._currentSelection?.getMonth(),
        disabled: false,
        renderDisabledIcon: false,
      };
      return output;
    });
    return output;
  }

  generateDays(defaultDate?: Date): interfaces.DatepickerOption_[] {
    if (defaultDate) {
      const day = getDate(defaultDate);
      const outDef = new Date(
        this._currentSelection?.getFullYear(),
        this._currentSelection?.getMonth(),
        day
      );
      this._currentSelection = outDef;
    }
    const rawDays = getDaysInMonth(this._currentSelection);
    const output = [];
    while (output.length < rawDays) {
      const newDay: number = output.length + 1;
      const targetDay = getDate(this._currentSelection);
      const value = new Date(
        this._currentSelection?.getFullYear(),
        this._currentSelection?.getMonth(),
        newDay
      );
      const renderDisabledIcon = this.validation(value);
      output.push({
        value,
        renderDisabledIcon,
        label: newDay.toString(),
        selected: newDay === targetDay,
        disabled: false || renderDisabledIcon,
      });
    }
    return output;
  }
}
