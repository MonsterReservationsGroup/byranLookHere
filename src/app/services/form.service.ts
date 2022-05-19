import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _formValues = {} as any;

  saveForm(formValues: any) {
    this._formValues = formValues;
  }

  get formValues() {
    return this._formValues;
  }

  get formIsPopulated() {
    return !!this._formValues.name;
  }

  constructor() {}
}
