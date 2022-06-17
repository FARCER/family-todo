import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';

@Component({
  selector: 'ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly supabaseService: SupabaseService
  ) {
    console.log(this.supabaseService.session)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  public async submit(e: any): Promise<any> {
    const login: string = this.form.value.login;
    const password: string = String(this.form.value.password);

    await this.supabaseService.login(login, password).then(
      (res) => {
        console.log(res)
      }
    )
  }

  public async logout(): Promise<any> {
    await this.supabaseService.logout().then(
      (res) => {
        console.log(res)
      }
    )
  }

}
