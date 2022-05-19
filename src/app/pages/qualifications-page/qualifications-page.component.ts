import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { format, subYears } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormService } from 'src/app/services/form.service';
import * as interfaces from '../../../../interfaces.d';
import { fadeInOut } from '../../animations/fade-in-out';
import * as services from '../../services';
services.fixNeverReadError(interfaces);

/*****Description*****

This page allows the guest to view and correct their data
********************/

function validateDate(control: AbstractControl) {
  const value = control.value;
  const regex = /\d\d\/\d\d\/\d\d\d\d$/gm;
  const output = regex.test(value);
  return output
    ? null
    : { invalidDate: 'Please enter a date in MM/DD/YYYY format' };
}

@Component({
  selector: 'rafa-qualifications-page',
  templateUrl: './qualifications-page.component.html',
  styleUrls: ['./qualifications-page.component.scss'],
  animations: [fadeInOut],
})
export class QualificationsPageComponent implements AfterViewInit {
  extraGuestInfo: Array<string> = [];
  validateDate(date: Date) {
    return date.getDate() === 15;
  }

  partyKeys = {
    Married: 2,
    'Single Male': 1,
    'Single Female': 1,
    'Co-Hab': 2,
    'Married/Co-Hab (Male Couples)': 2,
    'Married/Co-Hab (Female Couples)': 2,
  };

  minAdults = 1;

  validateAdults(control: AbstractControl): any {
    if (this.form) {
      const value = control.value;
      //@ts-ignore
      const key = this.partyKeys[this.form.get('maritalStatus').value];
      const isValid: boolean = value >= key;
      return isValid
        ? null
        : { invalidAdults: `Please select at least ${key} adults` };
    }

    return;
  }

  form = this.fb.group({
    maritalStatus: ['', Validators.required],
    zipCode: ['', Validators.required],
    income: ['', Validators.required],
    name: ['', Validators.required],
    dob: ['', [Validators.required, validateDate]],
    spouseName: ['', [Validators.required]],
    spouseDob: ['', [Validators.required, validateDate]],
    adults: ['', [Validators.required, this.validateAdults.bind(this)]],
    children: [''],
  });

  nextValidation() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    const { valid, errors } = this.form;
    if (valid) {
      const workingArr = Object.keys(this.form.value);
      const outputGuest = workingArr.reduce(
        (acc, key) => {
          const isExtra = key.includes('Extra');
          if (isExtra) {
            if (key.includes('Age')) {
              acc.extraInfo.push(
                `${format(
                  subYears(new Date(), this.form.value[key]),
                  'MM/dd/yyyy'
                )};`
              );
            } else {
              acc.extraInfo.push(`${this.form.value[key]},`);
            }
          }
          return acc;
        },
        { extraInfo: [] as any, guestInfo: {} as any }
      );
      this.state.guest = outputGuest.guestInfo;
      this.state.guest = this.form.value;
      let textToDevString = '';
      //@ts-ignore
      if (this.partyKeys[this.form.value.maritalStatus] === 2) {
        textToDevString = `${this.form.value.name}, ${this.form.value.dob}; ${this.form.value.spouseName}, ${this.form.value.spouseDob}`;
      } else {
        textToDevString = `${this.form.value.name}, ${this.form.value.dob}`;
      }
      this.state.textToDeveloper = `Party Details: ${textToDevString};${outputGuest.extraInfo.join(
        ''
      )} `;
    }
    window.scrollTo(0, document.body.scrollHeight + 300);
    this.formService.saveForm(this.form.value);
    return valid;
  }

  getDateErrors(field: string) {
    try {
      return this.form.get(field)?.errors!['invalidDate'];
    } catch (error) {
      return '';
    }
  }

  formatDate(value: Date | string) {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return value;
    }
    return format(date, 'MM/dd/yyyy');
  }

  testValidation(day: number, month: string, year: number) {
    if (day === 15) return 'sold out';
    return null;
  }

  constructor(
    private fb: FormBuilder,
    private crm: services.CrmService,
    private spinner: NgxSpinnerService,
    private state: services.StateService,
    public timeline: services.TimelineService,
    private formService: FormService
  ) {}

  ngOnInit(): void {}

  renderSpouseName() {
    return (
      this.form.get('maritalStatus')!.value &&
      !this.form.get('maritalStatus')!.value?.includes('Single')
    );
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  async ngAfterViewInit() {
    // adds form inputs for extra info on additional guests
    this.form.valueChanges.subscribe((val) => {
      const adultsModifier =
        //@ts-ignore
        parseInt(val.adults, 10) - this.partyKeys[val.maritalStatus];
      //@ts-ignore
      this.minAdults = this.partyKeys[val.maritalStatus];
      const partySize = adultsModifier + (parseInt(val.children, 10) || 0);
      let guestControls: Array<string> = [];
      console.log(this.form.value);
      if (partySize > 0) {
        guestControls = [];
        Array(partySize)
          .fill(0)
          .forEach((_, i) => {
            guestControls.push(`Extra Guest Name ${i + 1}`);
            guestControls.push(`Extra Guest Age ${i + 1}`);
          });
      } else {
        guestControls = [];
      }

      guestControls.forEach((guestControl) => {
        const alreadyExists = Object.keys(this.form.controls).includes(
          guestControl
        );

        const nonExistantKeys = Object.keys(this.form.controls).filter(
          (conrol) => {
            const isExtraKey = conrol.includes('Extra');
            const isNotInGuestControls = !guestControls.includes(conrol);
            return isExtraKey && isNotInGuestControls;
          }
        );
        if (!alreadyExists) {
          this.form.addControl(
            guestControl,
            this.fb.control('', Validators.required)
          );
        }

        nonExistantKeys.forEach((key) => {
          this.form.removeControl(key);
        });
      });
      if (!guestControls.length) {
        const extraExists = Object.keys(this.form.controls).filter((control) =>
          control.includes('Extra')
        );

        if (extraExists.length) {
          extraExists.forEach((control) => {
            this.form.removeControl(control);
          });
        }
      }
      this.extraGuestInfo = Object.keys(this.form.controls).filter(
        (control) => {
          const isExtraKey = control.includes('Extra');
          return isExtraKey;
        }
      );
    });

    this.timeline.registerCallback(this.nextValidation.bind(this));
    this.timeline.currentIndex = 1;
    this.spinner.show();
    let guest = {} as any;
    if (!this.state.guest.name) {
      guest = await this.crm.getGuest();
    } else {
      guest = this.state.guest;
    }

    let {
      maritalStatus,
      zipCode,
      adults,
      children,
      income,
      name,
      dob,
      spouseDob,
      spouseName,
    } = guest;

    dob = new Date(dob) as any;
    dob = this.formatDate(dob) as any;
    spouseDob = new Date(spouseDob) as any;
    spouseDob = this.formatDate(spouseDob) as any;
    income *= 1000;

    const payload = {
      maritalStatus,
      zipCode,
      income,
      name,
      spouseDob,
      spouseName,
      dob,
      adults,
      children,
    };

    for (const key in payload) {
      // @ts-ignore
      if (!payload[key]) payload[key] = '';
    }

    this.state.guest = guest;
    // get previous value if form prefilled;
    const finalPayload = this.formService.formIsPopulated
      ? this.formService.formValues
      : payload;
    this.form.patchValue(finalPayload);
    setTimeout(() => {
      this.form.patchValue(finalPayload);
    }, 1000);
    // removing validators from spouse name depending on if it is rendered
    this.form.valueChanges.subscribe(() => {
      const hasSpouse = this.renderSpouseName();
      if (hasSpouse) {
        if (this.spouseNameControl) {
          this.form.addControl('spouseName', this.spouseNameControl, {
            emitEvent: false,
          });
        }
        if (this.spouseDobControl) {
          this.form.addControl('spouseDob', this.spouseDobControl, {
            emitEvent: false,
          });
        }
      } else {
        this.spouseNameControl = this.form.get('spouseName')!;
        this.spouseDobControl = this.form.get('spouseDob')!;
        this.form.removeControl('spouseName', { emitEvent: false });
        this.form.removeControl('spouseDob', { emitEvent: false });
      }
    });

    this.spinner.hide();
  }
  spouseNameControl = null as any;
  spouseDobControl = null as any;
}
