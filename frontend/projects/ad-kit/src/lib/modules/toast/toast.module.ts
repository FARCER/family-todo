import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { defaultToastConfig, TOAST_DATA } from './toast-config';


@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [ToastComponent]
})
export class ToastModule {
  public static forRoot(config = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_DATA,
          useValue: { ...config, ...defaultToastConfig }
        }
      ]
    }

  }
}
