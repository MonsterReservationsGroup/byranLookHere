import { Pipe, PipeTransform } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

adds up the total of all the items in the cart

********************/

@Pipe({
  name: 'cartTotal',
})
export class CartTotalPipe implements PipeTransform {
  transform(value: Array<interfaces.CartItem_>, ...args: unknown[]): unknown {
    return value.reduce((acc, cur) => {
      if (cur.isRemoved) return acc;
      return acc + cur.price;
    }, 0);
  }
}
