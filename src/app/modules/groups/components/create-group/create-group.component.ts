import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { switchMap } from 'rxjs';
import { EUserGroupStatus } from '../../../../shared/enum/user-group-status.enum';

@Component({
  selector: 'ad-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  private isSubmitted: boolean = false;
  public form: FormGroup;

  private user: IProfile;

  constructor(
    private dataBdService: DataBdService,
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem('profile'))
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }


  public submit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.createGroup().pipe(
        switchMap((res: any) => this.updateUserGroupsTable(res.data.id))
      ).subscribe(
        (res) => {
          console.log(res)
        }
      )
    }
  }

  private createGroup() {
    const data = {
      creatorName: this.user.name,
      creatorId: this.user.id,
      name: this.form.value.name
    }
    return this.dataBdService.updateData(data, EBdTables.GROUPS)
  }

  private updateUserGroupsTable(id: string) {
    const data = {
      id,
      user_id: this.user.id,
      author: this.user.name,
      email: this.user.email,
      status: EUserGroupStatus.MEMBER
    }
    return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)
  }


  public validateNameField() {
    return this.isSubmitted && this.form.controls['name'].errors?.['required'];
  }

}
