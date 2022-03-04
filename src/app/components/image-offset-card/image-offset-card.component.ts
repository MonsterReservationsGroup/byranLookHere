import { Component, Input, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component displays a small blurb along with a centered offset image giving a nice layering effect
takes as input an imageUrl and a title
takes the body as ng content

********************/

@Component({
  selector: 'rafa-image-offset-card',
  templateUrl: './image-offset-card.component.html',
  styleUrls: ['./image-offset-card.component.scss'],
})
export class ImageOffsetCardComponent implements OnInit {
  @Input('title') title = '';

  constructor() {}

  ngOnInit(): void {}
}
