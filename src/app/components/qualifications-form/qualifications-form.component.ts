import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as interfaces from '../../../../interfaces.d';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

this component allows us to give the guest the ability to input / edit their:
marital status,
date of birth,
party size,
income,

********************/

@Component({
  selector: 'rafa-qualifications-form',
  templateUrl: './qualifications-form.component.html',
  styleUrls: ['./qualifications-form.component.scss'],
})
export class QualificationsFormComponent implements OnInit {
  logInput() {
    console.log(this.qualificationsForm.value);
  }
  maritalStatusChoices = [];
  qualificationsForm = this.fb.group({
    maritalStatus: [''],
    dateOfBirth: [''],
    partySize: [''],
    income: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
