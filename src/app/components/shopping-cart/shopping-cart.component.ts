import { Component, OnInit } from '@angular/core';
import { slideOut } from 'src/app/animations/slide-out';
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
}
