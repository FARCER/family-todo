import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';
import { ToastService } from 'ad-kit';
import { ILoginResponse } from '../../interfaces/login-response.interface';

@Component({
  selector: 'ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  private isSubmitted: boolean = false;

  constructor(
    private readonly authBdService: AuthBdService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    const login: string = this.form.value.login;
    const password: string = String(this.form.value.password);

    if (this.form.valid) {
      this.authBdService.login(login, password).subscribe(
        (res: ILoginResponse) => {
          this.toastService.show({
            text: 'Вы успешно авторизовались',
            type: 'success'
          })

          this.router.navigate(['/cabinet/profile'])
        }
      )
    }
  }

  public validateLoginFieldType(): boolean {
    return this.isSubmitted && this.form.controls['login'].errors?.['email'];
  }

  public checkRequiredFields(fieldName: string): boolean {
    return this.isSubmitted && this.form.controls[fieldName].errors?.['required'];
  }
}
