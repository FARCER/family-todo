import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';
import { Router } from '@angular/router';
import { ToastService } from 'ad-kit';
import { ILogoutResponse } from '../../../auth/interfaces/logout-response.interface';

@Component({
  selector: 'ad-cabinet-aside',
  templateUrl: './cabinet-aside.component.html',
  styleUrls: ['./cabinet-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetAsideComponent {

  constructor(
    private authBdService: AuthBdService,
    private router: Router,
    private toastService: ToastService) {
  }

  public logout(): void {
    this.authBdService.logout().subscribe(
      (res: ILogoutResponse) => {
        console.log(res);
        this.router.navigate(['']);
        this.toastService.show({ text: 'Вы успешно вышли из личного кабинета', type: 'success' })
      }
    )
  }

}
