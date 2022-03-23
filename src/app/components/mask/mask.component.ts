import { Component, OnInit } from '@angular/core';
import * as services from '../../services'
import * as interfaces from '../../../../interfaces.d'
services.fixNeverReadError(interfaces)

/*****Description*****

this component displays all its content in a column oriented flexbox. 

********************/

@Component({
  selector: 'rafa-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
