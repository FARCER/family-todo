import { NgModule } from '@angular/core';
import { InputModule } from './modules/input/input.module';
import { ToastModule } from './modules/toast/toast.module';
import { PreloaderModule } from './modules/preloader/preloader.module';
import { ButtonModule } from './modules/button/button.module';


@NgModule({
  declarations: [],
  imports: [
    InputModule,
    ToastModule.forRoot(),
    PreloaderModule,
    ButtonModule
  ],
  exports: [InputModule, ToastModule, PreloaderModule, ButtonModule]
})
export class AdKitModule {
}
