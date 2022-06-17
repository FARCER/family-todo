import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from } from 'rxjs';

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

  public submit(): void {
    const login: string = this.form.value.login;
    const password: string = this.form.value.password;

    from(this.supabaseService.register(login, password)).subscribe(
      (res) => {
        console.log(res);
      }
    )

  }

}
