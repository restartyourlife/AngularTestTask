import { AbstractControl, ValidatorFn } from '@angular/forms';

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const regExp: RegExp = /\s{2,}/g;
    let valid = !regExp.test(control.value);
    return valid ? null : { hasWhiteSpaces: true };
  };
}
