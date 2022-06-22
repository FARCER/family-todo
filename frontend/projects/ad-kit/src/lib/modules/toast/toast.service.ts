import { Inject, Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastComponent } from './toast.component';
import { TOAST_DATA, ToastConfig, ToastData } from './toast-config';
import { ToastRef } from './toast-ref';
import { PositionStrategy } from '@angular/cdk/overlay/position/position-strategy';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    @Inject(TOAST_DATA) private toastConfig: ToastConfig
  ) {
  }

  public show(data: ToastData): ToastRef {
    const positionStrategy: PositionStrategy = this.getPositionStrategy();
    const overlayRef: OverlayRef = this.overlay.create({ positionStrategy });
    const toastRef: ToastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(this.toastConfig.position.right + 'px');
  }

  private getPosition(): string {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
      ? this.lastToast.getPosition().bottom
      : this.toastConfig.position.top;

    return position + 'px';
  }

  private getInjector(data: ToastData, toastRef: ToastRef): Injector {
    const options = {
      providers: [
        {
          provide: TOAST_DATA,
          useValue: data
        },
        {
          provide: ToastRef,
          useValue: toastRef
        }
      ],
      parent: this.injector
    }

    return Injector.create(options);
  }
}
