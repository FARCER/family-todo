import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';

@Component({
  selector: 'ad-invite-to-family',
  templateUrl: './invite-to-family.component.html',
  styleUrls: ['./invite-to-family.component.scss']
})
export class InviteToFamilyComponent implements OnInit {

  public form: FormGroup;

  private isSubmitted: boolean = false;

  @Input() public familyId: string = '';

  constructor(
    private dataBdService: DataBdService
  ) {
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
        user_email: this.form.value.email
      }
      this.dataBdService.updateData(data, 'invite-to-family').subscribe(
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
