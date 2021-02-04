import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewPassResolver implements Resolve<Object> {
  constructor(private authService: AuthService, private route: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Object {
    const token = route.params.token;
    return this.authService.getNewPass(token).pipe(
      map((res) => {
        if (res['access']) {
          return { id: res['_id'], token: token };
        } else {
          this.route.navigate([res['redirect']]);
          return false;
        }
      })
    );
  }
}
