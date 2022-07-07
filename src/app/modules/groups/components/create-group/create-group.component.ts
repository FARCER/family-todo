import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { GroupsModel } from '../../models/groups.model';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';

@Component({
  selector: 'ad-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  @Output() public createGroupEmit: EventEmitter<string> = new EventEmitter<string>();
  @Input() public model: GroupsModel;

  private isSubmitted: boolean = false;
  public form: FormGroup;

  private user: IProfile;

  constructor(
    private dataBdService: DataBdService,
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE))
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
      this.createGroupEmit.emit(this.form.value.name);
    }
  }

  public validateNameField() {
    return this.isSubmitted && this.form.controls['name'].errors?.['required'];
  }

}
