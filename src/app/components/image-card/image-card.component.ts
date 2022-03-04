import { Component, Input, OnInit } from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component is used to showcase information along with a nice picture relavent to the information
takes an image url
takes a title
takes a ng content as description, p tag required
takes a footer

********************/

@Component({
  selector: 'rafa-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input('imageUrl') imageUrl: string = '';
  @Input('title') title: string = '';
  @Input('footer') footer: string = '';
  constructor() {}

  ngOnInit(): void {}
}
