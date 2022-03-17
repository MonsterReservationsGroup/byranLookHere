import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

format the date using date fns 

********************/

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: any): unknown {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return value;
    }
    return format(date, 'MMM dd, yyyy');
  }
}
