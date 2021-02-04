import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AuthService } from './auth.service';
import { ErrorsService } from 'src/app/errors.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errors: [{ msg: string }];
  constructor(
    private authService: AuthService,
    private errorService: ErrorsService
  ) {}

  ngOnInit(): void {
    this.loginFunc();
    this.errorService.errors.subscribe((error) => (this.errors = error));
  }

  private loginFunc() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(true, [Validators.required]),
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const rememberMe = this.loginForm.get('rememberMe').value;
    var login = new Login(email, password, rememberMe);
    this.onLogin(login);
  }

  onLogin(login: Login) {
    this.authService.login(login);
  }
}
