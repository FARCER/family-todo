import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { GetUserProfileService } from '../../../../shared/services/get-user-profile.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';

@Component({
  selector: 'ad-invite-to-family',
  templateUrl: './invite-to-family.component.html',
  styleUrls: ['./invite-to-family.component.scss']
})
export class InviteToFamilyComponent implements OnInit {

  @Input() public familyId: string = '';
  public form: FormGroup;

  private isSubmitted: boolean = false;
  private user: IProfile;


  constructor(
    private dataBdService: DataBdService,
    private getUserProfileService: GetUserProfileService
  ) {
    this.user = this.getUserProfileService.user;
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      const data = {
        family_id: this.familyId,
        user_email: this.form.value.email,
        author: this.user.name
      }
      this.dataBdService.updateData(data, EBdTables.INVITE_TO_FAMILY).subscribe(
        (res) => {
          console.log(res)
        }
      )
    }

  }

  public validateEmailField() {
    return this.isSubmitted && this.form.controls['email'].errors?.['required'];
  }

}
