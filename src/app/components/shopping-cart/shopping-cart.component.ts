import { Component, OnInit } from '@angular/core';
import { slideOut } from 'src/app/animations/slide-out';
import Swal from 'sweetalert2';
import { StateService, TimelineService } from '../../services';

/*****Description*****

displays an array of items
totals the cost of all items
displays a round picture of item
allows removal of items
allows back button

********************/

@Component({
  selector: 'rafa-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [slideOut],
})
export class ShoppingCartComponent implements OnInit {
  constructor(public state: StateService, public timeline: TimelineService) {}

  ngOnInit(): void {
    this.state.generateCart();
  }

  removeItem(item: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `You would be leaving your $${this.state.guest.packagePrice} unprotected`,
      confirmButtonColor: 'grey',
      showCancelButton: true,
      cancelButtonColor: 'green',
    }).then((result) => {
      if (result.isConfirmed) {
        this.state.removeFromCart(item.id);
      }
    });
  }
}
