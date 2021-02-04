import { Component, OnInit } from '@angular/core';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  constructor(private resetService: ResetService) {}

  ngOnInit(): void {}

  onReset(userEmail: string) {
    const email = {
      email: userEmail,
    };
    this.resetService.reset(email);
  }
}
