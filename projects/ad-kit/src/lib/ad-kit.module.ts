import { NgModule } from '@angular/core';
import { InputModule } from './modules/input/input.module';
import { ToastModule } from './modules/toast/toast.module';
import { PreloaderModule } from './modules/preloader/preloader.module';
import { ButtonModule } from './modules/button/button.module';
import { CheckboxModule } from './modules/checkbox/checkbox.module';
import { FormMessageModule } from './modules/form-message/form-message.module';


@NgModule({
  declarations: [],
  imports: [
    InputModule,
    ToastModule.forRoot(),
    PreloaderModule,
    ButtonModule,
    FormMessageModule
  ],
  exports: [InputModule, ToastModule, PreloaderModule, ButtonModule, CheckboxModule, FormMessageModule]
})
export class AdKitModule {
}
