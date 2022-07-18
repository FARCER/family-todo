import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';

@Component({
  selector: 'ad-auth-data-form',
  templateUrl: './auth-data-form.component.html',
  styleUrls: ['./auth-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDataFormComponent implements OnInit {
  public authForm: UntypedFormGroup;


  constructor(
    private userBdService: UserBdService,
    private authBdService: AuthBdService) {
  }

  ngOnInit(): void {
    this.initAuthForm()
  }

  private initAuthForm(): void {
    this.authForm = new UntypedFormGroup({
      email: new UntypedFormControl(this.userBdService.user?.email),
      password: new UntypedFormControl(''),
    })
  }

  public update(): void {
    // TODO Добавить корректную работу через логин и пароль
    const updateData = {
      email: this.authForm.value.email
    }

    this.authBdService.updateAuthData(updateData).subscribe(
      (res) => {
        console.log(res)
      }
    );

  }

}
