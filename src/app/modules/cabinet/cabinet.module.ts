import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CabinetModule { }
