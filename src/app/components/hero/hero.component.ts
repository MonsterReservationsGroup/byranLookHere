import { AfterViewInit, Component, Input } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component describes the current page
has a title input
a catchphrase input
takes body as ng content

********************/

@Component({
  selector: 'rafa-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit {
  @Input('title') title: string = '';
  @Input('catchphrase') catchphrase: string = '';
  constructor() {}

  ngAfterViewInit() {}
}
