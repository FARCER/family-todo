import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { itselfEmailValidator } from '../../../../shared/directives/itself-email.directive';
import { IUserGroup } from '../../interfaces/user-group.interface';

@Component({
  selector: 'ad-invite-to-group',
  templateUrl: './invite-to-group.component.html',
  styleUrls: ['./invite-to-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteToGroupComponent implements OnInit {


  @Input() private users: IUserGroup[] = [];
  @Output() public inviteToGroup: EventEmitter<string> = new EventEmitter<string>();

  private isSubmitted: boolean = false;
  private user: IProfile;

  public form: FormGroup;

  constructor(
    private dataBdService: DataBdService,
    private localStorageService: LocalStorageService,
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        itselfEmailValidator(this.user.email || '')])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      const email: string = this.form.value.email;
      this.isSubmitted = false;
      this.inviteToGroup.emit(email);
    }
  }

  public validateEmailField() {
    return this.isSubmitted && this.form.controls['email'].errors?.['required'];
  }

  public validateEmailFieldType(): boolean {
    return this.isSubmitted && this.form.controls['email'].errors?.['email'];
  }

  public validateItselfEmail(): boolean {
    return this.isSubmitted && this.form.controls['email'].errors?.['itselfEmail'];
  }

  public validateAlreadyMember(): boolean {
    return this.isSubmitted && this.form.controls['email'].errors?.['alreadyMember'];
  }

}
