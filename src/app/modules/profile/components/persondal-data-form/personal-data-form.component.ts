import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { PersonalDataModel } from '../../models/personal-data.model';
import { IProfile } from '../../interfaces/profile.interface';

@Component({
  selector: 'ad-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent implements OnInit {

  @Input() public model: PersonalDataModel;
  @Output() public updateData: EventEmitter<IProfile> = new EventEmitter<IProfile>();


  public profileModel$: Observable<Profile>;
  public form: UntypedFormGroup;

  constructor(
    private userBdService: UserBdService) {
  }

  ngOnInit(): void {
    this.initProfileForm(this.model)
  }

  private initProfileForm(profile: PersonalDataModel): void {
    this.form = new UntypedFormGroup({
      name: new FormControl<string>(profile?.name),
      surName: new FormControl<string>(profile?.surName),
      patronymic: new FormControl<string>(profile?.patronymic),
      dateOfBirth: new FormControl<string>(profile?.dateOfBirth),
    })
  }

  public updateProfile(): void {
    const updateData: IProfile = {
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
