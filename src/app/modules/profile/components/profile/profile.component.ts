import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { IProfile } from '../../interfaces/profile.interface';
import { EState } from '../../../../shared/enum/state.enum';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { PersonalDataModel } from '../../models/personal-data.model';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { IUpdatePersonalData } from '../../interfaces/update-personal-data.interface';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { ToastService } from 'ad-kit';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  public reloadProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public profileModel$: Observable<Profile>;

  private isProfileUpdate: boolean = false;

  constructor(
    private userBdService: UserBdService,
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log(this.userBdService.session)
    this.initModel();
  }

  private initModel(): void {
    this.profileModel$ = of(new Profile()).pipe(
      switchMap((model: Profile) => combineLatest([this.reloadProfile$]).pipe(
        switchMap(() => this.userBdService.profile),
        map((profile: IProfile) => {
          console.log(profile)
          this.localStorageService.setItem(ELocalStorageKeys.PROFILE, JSON.stringify(profile));
          model.personalData = new PersonalDataModel(profile)
          model.state = EState.READY;
          if (this.isProfileUpdate) {
            this.isProfileUpdate = false;
            this.toastService.show({
              text: 'Обновление данных прошло успешно',
              type: 'success'
            })
          }
          return model;
        }),
      ))
    )
  }

  public updatePersonalData(updateData: IUpdatePersonalData, model: Profile): void {
    model.state = EState.LOADING;
    this.isProfileUpdate = true;
    this.dataBdService.upsertData(updateData, EBdTables.USERS).subscribe(
      (res: any) => {
        if (res.error) {
          console.log(res);
          model.state = EState.READY;
          this.changeDetectorRef.markForCheck();
          this.toastService.show({
            text: 'При обновлении данных произошла ошибка. Попробуйте снова',
            type: 'warning'
          })
          return;
        }
        this.reloadProfile$.next(null)
      }
    )
  }

}