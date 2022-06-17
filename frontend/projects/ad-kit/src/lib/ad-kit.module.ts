import { NgModule } from '@angular/core';
import { InputModule } from './modules/input/input.module';
import { ToastModule } from './modules/toast/toast.module';


@NgModule({
  declarations: [],
  imports: [
    InputModule,
    ToastModule.forRoot(),
  ],
  exports: [InputModule, ToastModule]
})
export class AdKitModule {
}
