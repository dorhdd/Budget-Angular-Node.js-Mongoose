import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.getLoggin().pipe(
      map((res) => {
        this.authService.loggedInSub.next(res['access']);
        if (res['access']) {
          return true;
        } else {
          this.route.navigate([res['redirect']]);
          return false;
        }
      })
    );
  }
}
