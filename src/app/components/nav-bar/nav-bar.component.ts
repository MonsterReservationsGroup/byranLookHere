import {Component, OnInit} from '@angular/core';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

monster logo on the left flat white
like us on the right

********************/

@Component({
  selector: 'rafa-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  links: Array<interfaces.Link_> = [
    {
      text: 'Website',
      url: 'https://www.monsterrg.com',
    },
    {
      text: 'Facebook',
      url: 'https://www.facebook.com/MRGVacations/',
    },
    {
      text: 'Instagram',
      url: 'https://www.instagram.com/MRGVacations/',
    },
    {
      text: 'About',
      url: 'https://monsterrg.com/blog/',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
