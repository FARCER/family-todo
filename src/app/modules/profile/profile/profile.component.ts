import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserBdService } from '../../../shared/services/bd/user-bd.service';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Profile } from '../models/profile.model';
import { IProfile } from '../interfaces/profile.interface';
import { EState } from '../../../shared/enum/state.enum';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { PersonalDataModel } from '../models/personal-data.model';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  public reloadProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public profileModel$: Observable<Profile>

  constructor(
    private userBdService: UserBdService,
    private localStorageService: LocalStorageService
  ) {
    console.log(this.userBdService.session)
    this.initModel();
  }

  private initModel(): void {
    this.profileModel$ = of(new Profile()).pipe(
      switchMap((model: Profile) => combineLatest([this.reloadProfile$]).pipe(
        switchMap(() => this.userBdService.profile),
        map((profile: IProfile) => {
          this.localStorageService.setItem('profile', JSON.stringify(profile));
          model.personalData = new PersonalDataModel(profile)
          model.state = EState.READY;
          return model;
        }),
      ))
    )
  }

}
