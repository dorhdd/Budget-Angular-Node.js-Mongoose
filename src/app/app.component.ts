import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.loggedInSub.subscribe(
      (boolean) => (this.loggedIn = boolean)
    );
  }
}
