import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TOAST_DATA, ToastData } from './toast-config';
import { ToastRef } from './toast-ref';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {

  constructor(
    private readonly ref: ToastRef,
    @Inject(TOAST_DATA) public readonly data: ToastData) {

    if (this.data.type === 'success') {
      setTimeout(() => {
        this.close()
      }, 3000)
    }

  }

  public close(): void {
    this.ref.close();
  }

}
