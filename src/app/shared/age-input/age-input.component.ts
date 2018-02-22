import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  format,
  isDate,
  isValid,
  isFuture
} from 'date-fns';

import { isValidate, convertToDate } from '../../utils/date.util';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  selectedUnit = AgeUnit.Year;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  form: FormGroup;
  private propagateChange = (_: any) => {}

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  @Input() format = 'YYYY-MM-DD';

  private subBirth: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initDate = format(subYears(Date.now(), 30));
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [parse(initDate), this.validateDate],
      age: this.fb.group({
        ageNum: [initAge.age],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    });

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age')!.get('ageNum');
    const ageUnit = this.form.get('age')!.get('ageUnit');

    const birthday$ = birthday!.valueChanges
      .map(d => ({date: d, from: 'birthday'}))
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(date => birthday!.valid);
      
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum!.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit!.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();;
    
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_num, _unit) => this.toDate({age: _num, unit: _unit}))
      .map(d => ({date: d, from: 'age'}))
      .filter(_ => this.form.get('age')!.valid);

    const merged$ = Observable.merge(birthday$, age$)
      .filter(_ => this.form.valid);

    // this.subBirth = merged$.subscribe(d => {
    //   const age = this.toAge(d.date);
    //   if (d.from === 'birthday') {
    //     if (age.age !== ageNum.value) {
    //       ageNum.patchValue(age.age, {emitEvent: false})
    //     }
    //     if (age.unit !== ageUnit.value) {
    //       this.selectedUnit = age.unit;
    //       ageUnit.patchValue(age.unit, {emitEvent: false})
    //     }
    //     this.propagateChange(d.date);
    //   } else {
    //     const ageToCompare = this.toAge(birthday!.value);
    //     if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
    //       birthday.patchValue(d.date, {emitEvent: false});
    //       this.propagateChange(d.date);
    //     }
    //   }
    // })

    this.subBirth = merged$.subscribe(date => {
      const age = this.toAge(date.date);
      if (date.from === 'birthday') {
        if (age.age === ageNum!.value && age.unit === ageUnit!.value) {
          return;
        }
        ageUnit!.patchValue(age.unit, {emitEvent: false, emitModelToViewChange: true, emitViewToModelChange: true});
        ageNum!.patchValue(age.age, {emitEvent: false});
        this.selectedUnit = age.unit;
        this.propagateChange(date.date);

      } else {
        const ageToCompare = this.toAge(birthday!.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday!.patchValue(parse(date.date), {emitEvent: false});
          this.propagateChange(date.date);
        }
      }
    });
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;

    if (!val) {
      return null;
    }
    if (isValidate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    } 
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidate(val) ? null : {
      birthdayInvalid: true
    }
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey]; 
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop
          break;
        }
        default: {
          result = false;
          break;
        }
      }
      return result ? null : {
        ageInvalid: true
      };
    }
  }

  private toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = new Date();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return {
        age: differenceInDays(now, date),
        unit: AgeUnit.Day
      };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return {
        age: differenceInMonths(now, date),
        unit: AgeUnit.Month
      };
    } else {
      return {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
    }
  }

  private toDate(age: Age): string {
    const now = new Date();
    switch (age.unit) {
      case AgeUnit.Year: {
        // return convertToDate(subYears(now, age.age));
        return format(subYears(now, age.age), this.format)
      }
      case AgeUnit.Month: {
        // return convertToDate(subMonths(now, age.age));
        return format(subMonths(now, age.age), this.format)
      }
      case AgeUnit.Day: {
        // return convertToDate(subDays(now, age.age));
        return format(subDays(now, age.age), this.format)
      }
      default: {
        return '1991-01-01';
      }
    }
  }


}
