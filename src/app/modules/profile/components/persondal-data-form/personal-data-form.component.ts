import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { PersonalDataModel } from '../../models/personal-data.model';
import { IUpdatePersonalData } from '../../interfaces/update-personal-data.interface';

@Component({
  selector: 'ad-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent implements OnInit {

  @Input() public model: PersonalDataModel;
  @Output() public updateData: EventEmitter<IUpdatePersonalData> = new EventEmitter<IUpdatePersonalData>();


  public profileModel$: Observable<Profile>;
  public form: FormGroup;

  constructor(
    private userBdService: UserBdService) {
  }

  ngOnInit(): void {
    this.initProfileForm(this.model)
  }

  private initProfileForm(profile: PersonalDataModel): void {
    this.form = new FormGroup({
      name: new FormControl(profile?.name),
      surName: new FormControl(profile?.surName),
      patronymic: new FormControl(profile?.patronymic),
      dateOfBirth: new FormControl(profile?.dateOfBirth),
    })
  }

  public updateProfile(): void {
    const updateData: IUpdatePersonalData = {
      name: this.form.value.name,
      surName: this.form.value.surName,
      patronymic: this.form.value.patronymic,
      dateOfBirth: this.form.value.dateOfBirth,
      email: this.userBdService.user?.email,
      id: this.userBdService.user?.id,
      updated_at: new Date(),
    }
    this.updateData.emit(updateData);
  }

  public canSubmit(): boolean {
    return this.form.valid && !this.form.pristine;
  }
}
