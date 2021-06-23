import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let valid = !control.value || control.value.length <= 22;
    return valid ? null : { phonenumber: true };
  };
}
