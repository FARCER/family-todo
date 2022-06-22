import { Component, Inject } from '@angular/core';
import { TOAST_DATA, ToastData } from './toast-config';
import { ToastRef } from './toast-ref';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(
    private readonly ref: ToastRef,
    @Inject(TOAST_DATA) public readonly data: ToastData) {
  }

  public close(): void {
    this.ref.close();
  }

}
