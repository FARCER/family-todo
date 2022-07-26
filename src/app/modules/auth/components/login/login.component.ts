import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';
import { ToastService } from 'ad-kit';
import { ILoginResponse } from '../../interfaces/login-response.interface';
import { ApiError } from '@supabase/gotrue-js/src/lib/types';

@Component({
  selector: 'ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: UntypedFormGroup;

  private isSubmitted: boolean = false;

  constructor(
    private readonly authBdService: AuthBdService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      login: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    const login: string = this.form.value.login;
    const password: string = String(this.form.value.password);

    if (this.form.valid) {
      this.authBdService.login(login, password).subscribe(
        (res: ILoginResponse) => {
          if (res.error) {
            this.handleLoginErrors(res.error);
            return;
          }
          this.toastService.show({
            text: 'Вы успешно авторизовались',
            type: 'success'
          })

          this.router.navigate(['/cabinet/profile'])
        },
      )
    }
  }

  private handleLoginErrors(error: ApiError): void {
    this.toastService.show({
      text: error.message,
      type: 'warning'
    })
  }

  public validateLoginFieldType(): boolean {
    return this.isSubmitted && this.form.controls['login'].errors?.['email'];
  }

  public checkRequiredFields(fieldName: string): boolean {
    return this.isSubmitted && this.form.controls[fieldName].errors?.['required'];
  }
}
