import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function itselfEmailValidator(userEmail: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return userEmail === control.value ? { itselfEmail: { value: true } } : null;
  };
}
