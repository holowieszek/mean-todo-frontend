import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;

    if (password !== confirmPassword) {
      return password ? { 'matchPassword': true } : null;
    } else {
      return null;
    }
  }
}
