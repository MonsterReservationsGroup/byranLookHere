import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as interfaces from '../../../../interfaces.d';
import { fadeInOut } from '../../animations/fade-in-out';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

This page allows the guest to view and correct their data
********************/

@Component({
  selector: 'rafa-qualifications-page',
  templateUrl: './qualifications-page.component.html',
  styleUrls: ['./qualifications-page.component.scss'],
  animations: [fadeInOut],
})
export class QualificationsPageComponent implements AfterViewInit {
  validateDate(date: Date) {
    return date.getDate() === 15;
  }
  form = this.fb.group({
    maritalStatus: ['', []],
    zipCode: ['', []],
    income: ['', []],
    name: ['', []],
    dob: ['', []],
    spouseName: ['', []],
  });

  testValidation(day: number, month: string, year: number) {
    if (day === 15) return 'sold out';
    return null;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(console.log);
  }
}
