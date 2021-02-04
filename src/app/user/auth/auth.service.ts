import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ErrorsService } from 'src/app/errors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = environment.HOST_URL;
  loggedInSub = new Subject<boolean>();
  profileSub = new Subject<{ email: string; src: string }>();

  constructor(
    private http: HttpClient,
    private route: Router,
    private errorService: ErrorsService
  ) {}

  login(login: Login) {
    return this.http
      .post<Login>(this.URL + 'login', login)
      .subscribe((location) => {
        if (location[0]['msg']) {
          return this.errorService.errors.next(location);
        }
        this.route.navigate([location[0]['redirect']]);
      });
  }

  getLoggin() {
    return this.http.get<boolean>(this.URL + 'logged');
  }

  logOut() {
    return this.http.post(this.URL + 'logout', {}).subscribe((location) => {
      this.loggedInSub.next(false);
      this.profileSub.next({ email: '', src: '' });
      this.route.navigate([location['redirect']]);
    });
  }

  createNewPass(newPass: {
    password: string;
    confirmPassword: string;
    id: string;
    token: string;
  }) {
    return this.http
      .post(this.URL + 'postNewPass', newPass)
      .subscribe((location) => {
        this.route.navigate([location['redirect']]);
      });
  }

  getNewPass(token) {
    return this.http.get(this.URL + 'add-newpass/' + token);
  }

  getProfile() {
    return this.http
      .get<{ email: string; src: string }>(this.URL + 'getProfile')
      .subscribe((profile) => {
        this.profileSub.next(profile);
      });
  }

  editProfile(email) {
    return this.http.put<{ email: string }>(this.URL + 'editProfile', email);
  }

  addProfileImage(file) {
    return this.http.post<any>(this.URL + 'addImage', file);
  }

  deleteImage() {
    return this.http.delete<{ email: string; src: string }>(this.URL + 'deleteImage').subscribe((profile) => {      
      this.profileSub.next(profile);
    });
  }
}
