import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastService } from 'ad-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private toastService: ToastService
  ) {
  }

  public showToast() {
    this.toastService.show({ text: 'Everything is ok!', type: 'success'});
  }
}
