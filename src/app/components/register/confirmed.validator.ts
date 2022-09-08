import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMustMatch(controler: AbstractControl): ValidationErrors | null 
{
  return controler.get('password1')?.value !== controler.get('password2')?.value?
   { 'mustmatch': true} : null;
}