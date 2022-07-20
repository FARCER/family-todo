import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';
import { IRegisterResponse } from '../../interfaces/register-response.interface';
import { ToastService } from 'ad-kit';

@Component({
  selector: 'ad-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public form: UntypedFormGroup;
  private isSubmitted: boolean;

  constructor(
    private readonly authBdService: AuthBdService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      login: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    const login: string = this.form.value.login;
    const password: string = this.form.value.password;

    if (this.form.valid) {
      this.authBdService.register(login, password).subscribe(
        (res: IRegisterResponse) => {
          this.toastService.show({
            text: 'Вы успешно зарегистрированы',
            type: 'success'
          })
          this.router.navigate(['/cabinet'])
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
