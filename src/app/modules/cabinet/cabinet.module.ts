import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RouterModule } from '@angular/router';
import { AdKitModule } from 'ad-kit';
import { CabinetAsideComponent } from './components/cabinet-aside/cabinet-aside.component';


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetAsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdKitModule,
  ]
})
export class CabinetModule {
}
