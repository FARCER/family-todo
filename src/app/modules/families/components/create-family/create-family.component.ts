import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';

@Component({
  selector: 'ad-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.scss']
})
export class CreateFamilyComponent implements OnInit {

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
      const data = {
        creatorName: this.user.name,
        creatorId: this.user.id,
        name: this.form.value.name
      }
      this.dataBdService.updateData(data, EBdTables.FAMILIES).subscribe(
        (res) => {
          console.log(res)
        }
      )
    }
  }


  public validateNameField() {
    return this.isSubmitted && this.form.controls['name'].errors?.['required'];
  }

}
