import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly supabaseService: SupabaseService,
    private router: Router
  ) {
    console.log(this.supabaseService.session)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  public submit(): void {
    const login: string = this.form.value.login;
    const password: string = String(this.form.value.password);

    from(this.supabaseService.login(login, password)).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate(['/profile'])

      }
    )
  }

}
