import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthBdService } from '../../../shared/services/bd/auth-bd.service';

@Component({
  selector: 'ad-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexPageComponent {

  constructor(
    private authBdService: AuthBdService
  ) {
  }

  public isAuthorized(): boolean {
    return this.authBdService.isAuthorized();
  }

}
