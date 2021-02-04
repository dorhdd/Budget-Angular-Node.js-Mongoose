import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editMode = false;
  profile: { email: string; src: string } = { email: '', src: '' };
  error: string;
  msg: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.onGetProfile();
  }

  onGetProfile() {
    this.authService.profileSub.subscribe((profile) => {
      this.profile.email = profile['email'];
      this.profile.src = profile['image'];
    });
    this.authService.getProfile();
  }

  onEditProfile() {
    this.clearMsg();
    this.authService
      .editProfile({ email: this.profile.email })
      .subscribe((res) => {
        this.editMode = false;
        if (res['error']) {
          this.error = res['error'];
        }
        if (res['msg']) {
          this.msg = res['msg'];
        }
      });
  }

  fileChange(event) {
    this.clearMsg();
    const file = event.target.files[0];
    const data = new FormData();
    data.append('image', file, file.name);
    this.authService.addProfileImage(data).subscribe((res) => {
      if (res['error']) {
        this.error = res['error'];
      }
      this.authService.profileSub.next(res);
      this.msg = 'updated!';
    });
  }

  clearMsg() {
    this.error = null;
    this.msg = null;
  }

  onDeleteImage() {
    this.authService.deleteImage();
  }
}
