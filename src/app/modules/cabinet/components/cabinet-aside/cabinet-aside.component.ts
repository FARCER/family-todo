import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';
import { Router } from '@angular/router';
import { ToastService } from 'ad-kit';

@Component({
  selector: 'ad-cabinet-aside',
  templateUrl: './cabinet-aside.component.html',
  styleUrls: ['./cabinet-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetAsideComponent implements OnInit {

  constructor(
    private authBdService: AuthBdService,
    private router: Router,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
  }


  public logout(): void {
    from(this.authBdService.logout()).subscribe(
      (res) => {
        this.router.navigate(['']);
        this.toastService.show({ text: 'Вы успешно вышли из личного кабинета', type: 'success' })
      }
    )
  }

}
