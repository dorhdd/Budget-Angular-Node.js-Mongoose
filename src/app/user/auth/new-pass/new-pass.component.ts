import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css'],
})
export class NewPassComponent implements OnInit {
  newPass: FormGroup;
  _id: string;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginFunc();
    this.activatedRoute.data.subscribe((data) => {
      this.newPass.get('id').setValue(data.data.id);
      this.newPass.get('token').setValue(data.data.token);
    });
  }

  private loginFunc() {
    this.newPass = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const password = this.newPass.get('password').value;
    const confirmPassword = this.newPass.get('confirmPassword').value;
    const id = this.newPass.get('id').value;
    const token = this.newPass.get('token').value;

    const newPass = {
      password: password,
      confirmPassword: confirmPassword,
      id: id,
      token: token,
    };
    this.onCreateNewPass(newPass);
  }

  onCreateNewPass(newPass: {
    password: string;
    confirmPassword: string;
    id: string;
    token: string;
  }) {
    this.authService.createNewPass(newPass);
  }
}
