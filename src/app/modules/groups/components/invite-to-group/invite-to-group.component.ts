import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { GetUserProfileService } from '../../../../shared/services/get-user-profile.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'ad-invite-to-group',
  templateUrl: './invite-to-group.component.html',
  styleUrls: ['./invite-to-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteToGroupComponent implements OnInit {

  @Input() public groupId: string = '';
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
      const email: string = this.form.value.email;
      this.getUserId().pipe(
        switchMap((user_id: string) => {
          const data = {
            id: this.groupId,
            user_email: email,
            author: this.user.name,
            user_id,
          }
          return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)

        })
      ).subscribe(
        (res) => {
          console.log(res)
        }
      )
    }
  }

  private getUserId(): Observable<string> {
    return this.dataBdService.getData({
      table: EBdTables.USERS,
      filterType: EFilterType.EMAIL,
      filterField: 'email',
      columns: 'id',
      customFilterField: this.form.value.email
    }).pipe(
      map((res: any) => res.data[0].id)
    )
  }

  public validateEmailField() {
    return this.isSubmitted && this.form.controls['email'].errors?.['required'];
  }

}
