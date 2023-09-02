import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumberRegex = /^[0-9]{10}$/;
    const isValid = mobileNumberRegex.test(control.value);
    
    return isValid ? null : { 'invalidMobileNumber': true };
  };
}
