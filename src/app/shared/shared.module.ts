import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseflPipe } from './pipes/uppercasefl.pipe';



@NgModule({
  declarations: [
    UppercaseflPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercaseflPipe
  ]
})
export class SharedModule { }
