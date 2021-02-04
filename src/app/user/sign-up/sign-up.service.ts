import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/sign-up';
import { ErrorsService } from 'src/app/errors.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  URL = environment.HOST_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorsService: ErrorsService
  ) {}

  signUp(newUser: SignUp) {
    return this.http
      .post<SignUp>(this.URL + 'signup', newUser)
      .subscribe((location) => {
        if (location[0]['msg']) {
          return this.errorsService.errors.next(location);
        }
        this.router.navigate([location[0]['redirect']]);
      });
  }
}
