import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupStatusPipe } from './pipes/user-group-status.pipe';


@NgModule({
  declarations: [

    UserGroupStatusPipe
  ],
  exports: [
    UserGroupStatusPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
