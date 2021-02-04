import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUp } from 'src/app/models/sign-up';
import { SignUpService } from './sign-up.service';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  errors: string[];
  constructor(
    private signUpService: SignUpService,
    private errorService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.signupFunc();
    this.errorService.errors.subscribe((error) => (this.errors = error));
  }

  private signupFunc() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [ Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    const newUser = new SignUp(email, password, confirmPassword);
    this.onSignUp(newUser);
  }

  onSignUp(newUser: SignUp) {
    this.signUpService.signUp(newUser);
  }
}
