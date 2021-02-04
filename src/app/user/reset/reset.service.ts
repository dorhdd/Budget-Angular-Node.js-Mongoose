import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  URL = environment.HOST_URL + 'reset'
  constructor(private http: HttpClient, private router: Router) {}

  reset(email: {email:string}) {
    return this.http
      .post<string>(this.URL, email)
      .subscribe((location) => {
        this.router.navigate([location['redirect']]);
      });
  }
}
