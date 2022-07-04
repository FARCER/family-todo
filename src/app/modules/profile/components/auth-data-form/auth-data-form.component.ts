import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { AuthBdService } from '../../../../shared/services/bd/auth-bd.service';

@Component({
  selector: 'ad-auth-data-form',
  templateUrl: './auth-data-form.component.html',
  styleUrls: ['./auth-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthDataFormComponent implements OnInit {
  public authForm: FormGroup;


  constructor(
    private userBdService: UserBdService,
    private authBdService: AuthBdService) {
  }

  ngOnInit(): void {
    this.initAuthForm()
  }

  private initAuthForm(): void {
    this.authForm = new FormGroup({
      email: new FormControl(this.userBdService.user?.email),
      password: new FormControl(''),
    })
  }

  public update(): void {
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
