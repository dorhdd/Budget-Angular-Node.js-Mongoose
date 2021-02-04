import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NewPassComponent } from './auth/new-pass/new-pass.component';



@NgModule({
  declarations: [ProfileComponent, AuthComponent, SettingsComponent, SignUpComponent, NewPassComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ProfileComponent, AuthComponent, SettingsComponent]
})
export class UserModule { }
