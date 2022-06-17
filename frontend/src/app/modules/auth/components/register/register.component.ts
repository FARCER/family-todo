import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';

@Component({
  selector: 'ad-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly supabaseService: SupabaseService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  public async submit(e: any): Promise<any> {
    const login: string = this.form.value.login;
    const password: string = this.form.value.password;

    await this.supabaseService.register(login, password).then(
      (res) => {
        console.log(res);
      }
    )
  }

}
