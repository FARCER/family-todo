import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import { PreloaderModule } from 'ad-kit';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    PreloaderModule,
    RouterModule
  ]
})
export class IndexPageModule {
}
