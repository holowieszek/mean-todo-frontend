import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from './password.validation';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor (private authService: AuthService) {}

  ngOnInit () {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      comparePassword: new FormGroup({
        password: new FormControl(null, {
          validators: [Validators.required]
        }),
        confirmPassword: new FormControl(null, {
          validators: [Validators.required]
        })
      }, {
        validators: [PasswordValidation.matchPassword]
      })
    });
  }

  onRegister () {
    if (this.form.invalid) {
      return;
    }
    const data = {
      email: this.form.value.email,
      password: this.form.value.comparePassword.password,
      confirmPassword: this.form.value.comparePassword.confirmPassword
    };

    this.authService.register(data);
  }
}
