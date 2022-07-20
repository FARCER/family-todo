import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { BehaviorSubject, map, Observable, startWith, switchMap } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { IProfile } from '../../interfaces/profile.interface';
import { EState } from '../../../../shared/enum/state.enum';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { PersonalDataModel } from '../../models/personal-data.model';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { ToastService } from 'ad-kit';
import { Store } from '@ngrx/store';
import { IModelWithState } from '../../../../shared/interfaces/model-with-state.interface';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  public model$: Observable<IModelWithState<Profile>>
  public reloadProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public profile$: Observable<any>;
  public loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private userBdService: UserBdService,
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService,
    private toastService: ToastService,
    private store: Store,
  ) {
    this.initModel();
    // this.profile$ = this.store.select(profileSelector);
    // this.store.dispatch(new GetUser());
  }

  private initModel(): void {
    this.model$ = this.reloadProfile$.pipe(
      switchMap(() => this.userBdService.profile),
      map((personalData: IProfile) => {
        const profile = new Profile();
        this.localStorageService.setItem(ELocalStorageKeys.PROFILE, JSON.stringify(personalData));
        profile.personalData = new PersonalDataModel(personalData)
        return { state: EState.READY, data: profile };
      }),
      startWith({ state: EState.LOADING })
    )
  }

  public updatePersonalData(updateData: IProfile, model: Profile): void {
    this.loader$.next(true);
    this.dataBdService.upsertData(updateData, EBdTables.USERS).subscribe(
      (res: any) => {
        if (res.error) {
          this.toastService.show({
            text: 'При обновлении данных произошла ошибка. Попробуйте снова',
            type: 'warning'
          })
          return;
        }
        this.toastService.show({
          text: 'Обновление данных прошло успешно',
          type: 'success'
        })
        const profile: IProfile = res.data;
        model.personalData = new PersonalDataModel(profile);
        this.loader$.next(false);
      }
    )
  }

}
