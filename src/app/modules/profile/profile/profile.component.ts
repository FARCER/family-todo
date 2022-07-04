import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { Profile } from '../models/profile.model';
import { EState } from '../../../shared/enum/state.enum';
import { UserBdService } from '../../../shared/services/bd/user-bd.service';
import { AuthBdService } from '../../../shared/services/bd/auth-bd.service';
import { DataBdService } from '../../../shared/services/bd/data-bd.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { EBdTables } from '../../../shared/enum/bd-tables.enum';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public profileModel$: Observable<Profile>;
  public form: FormGroup;

  constructor(
    private userBdService: UserBdService,
    private authBdService: AuthBdService,
    private dataBdService: DataBdService,
    private localStorageService: LocalStorageService
  ) {
    console.log(this.userBdService.session)
  }

  ngOnInit(): void {
    this.initProfileModel();
  }

  private initProfileModel(): void {
    let model: Profile;

    this.profileModel$ = of(new Profile()).pipe(
      switchMap((profile: Profile) => {
        console.log(profile)
        model = profile;
        return this.userBdService.profile;
      }),
      map((profile: IProfile) => {
        this.localStorageService.setItem('profile', JSON.stringify(profile));
        this.initForm(profile);
        model.state = EState.READY;
        return model;
      }),
      startWith(new Profile()),
    )
  }

  private initForm(profile: IProfile): void {
    this.form = new FormGroup({
      name: new FormControl(profile?.name),
      surName: new FormControl(profile?.surName),
      patronymic: new FormControl(profile?.patronymic),
      dateOfBirth: new FormControl(profile?.dateOfBirth),
      email: new FormControl(profile?.email),
    })
  }

  public updateProfile(): void {
    const profile: IProfile = {
      name: this.form.value.name,
      surName: this.form.value.surName,
      patronymic: this.form.value.patronymic,
      dateOfBirth: this.form.value.dateOfBirth,
      email: this.form.value.email
    }
    const updateData = {
      ...profile,
      id: this.userBdService.user?.id,
      updated_at: new Date(),
    }
    this.dataBdService.updateData(updateData, EBdTables.USERS).subscribe(
      (res) => {
        console.log(res);
      }
    )

  }

}
