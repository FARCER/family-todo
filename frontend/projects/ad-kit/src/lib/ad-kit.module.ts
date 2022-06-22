import { NgModule } from '@angular/core';
import { InputModule } from './modules/input/input.module';
import { ToastModule } from './modules/toast/toast.module';
import { PreloaderModule } from './modules/preloader/preloader.module';


@NgModule({
  declarations: [],
  imports: [
    InputModule,
    ToastModule.forRoot(),
    PreloaderModule,
  ],
  exports: [InputModule, ToastModule, PreloaderModule]
})
export class AdKitModule {
}
