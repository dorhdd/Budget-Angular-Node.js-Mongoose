import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  opened = false;
  profile: { email: string; src: string } = { email: '', src: '' };
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.getProfileImg();
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  onLogout() {
    this.authService.logOut();
  }

  getProfileImg() {
    this.authService.getProfile();
    this.authService.profileSub.subscribe((profile) => {
      this.profile.src = profile['image'];
      this.profile.email = profile['email'];
    });
  }
}
