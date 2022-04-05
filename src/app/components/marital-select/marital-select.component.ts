import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError('');

/*****Description*****

this component allows you to select from:
married, single, co-hab, married cohab males, married cohab females

********************/

@Component({
  selector: 'rafa-marital-select',
  templateUrl: './marital-select.component.html',
  styleUrls: ['./marital-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MaritalSelectComponent,
    },
  ],
})
export class MaritalSelectComponent implements OnInit {
  baseIcon = '../../../assets/MaritalSelect/';
  currentValue: string = null as any;
  blurb: Array<string> = [] as any;
  onChange = (value: any) => console.log(value);
  onTouch = () => {};
  maritalButtons: Array<interfaces.MaritalButton_> = [
    { value: 'Married', blurb: 'I am Married', selected: false },
    { value: 'Single Female', blurb: 'I am a Single Female', selected: false },
    { value: 'Single Male', blurb: 'I am a Single Male', selected: false },
    { value: 'Co-Hab', blurb: 'I am living with someone', selected: false },
    {
      value: 'Married/Co-Hab (Male Couples)',
      blurb: 'I am in a Same Sex Male relationship',
      selected: false,
    },
    {
      value: 'Married/Co-Hab (Female Couples)',
      blurb: 'I am in a Same Sex Female relationship',
      selected: false,
    },
  ];

  constructor() {}

  selectItem(index: number) {
    this.reset();
    this.maritalButtons[index].selected = true;
    this.typeBlurb(this.maritalButtons[index].blurb, 10);
    this.currentValue = this.maritalButtons[index].value;
    this.onChange(this.currentValue);
    this.onTouch();
  }

  async typeBlurb(blurb: string, delay: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay));
    const workingString = blurb.split('');
    if (workingString.length === 0) return;
    this.blurb.push(workingString.shift() as any);
    return this.typeBlurb(workingString.join(''), delay);
  }

  writeValue(value: string) {
    if (!value) return;
    const i = this.maritalButtons.findIndex((b) => b.value === value);
    if (i === -1) {
      return console.log(
        `${value} is not a valid value for marital status component`
      );
    }
    this.selectItem(i);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  reset() {
    this.maritalButtons.forEach((b) => (b.selected = false));
    this.blurb = [];
  }

  ngOnInit(): void {
    this.typeBlurb('Select your Marital Status', 10);
  }
}
