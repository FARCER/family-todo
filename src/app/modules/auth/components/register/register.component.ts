import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';

@Component({
  selector: 'ad-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly authBdService: AuthBdService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  public submit(): void {
    const login: string = this.form.value.login;
    const password: string = this.form.value.password;

    from(this.authBdService.register(login, password)).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/cabinet'])
      }
    )

  }

}
