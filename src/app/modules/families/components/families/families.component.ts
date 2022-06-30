import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { FamiliesModel } from '../../models/families.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';
import { GetUserProfileService } from '../../../../shared/services/get-user-profile.service';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';

@Component({
  selector: 'ad-family',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {

  public myFamilies$: Observable<FamiliesModel>;

  private user: IProfile;
  private reloadFamilies$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService,
    private getUserProfileService: GetUserProfileService
  ) {
    this.user = this.getUserProfileService.user;
  }

  ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.myFamilies$ = of(new FamiliesModel()).pipe(
      switchMap((model: FamiliesModel) => combineLatest([this.reloadFamilies$]).pipe(
        switchMap(() => forkJoin([this.dataBdService.getData({
          table: EBdTables.FAMILIES,
          columns: 'creatorName, id',
          filterField: 'creatorId',
          filterType: EFilterType.ID
        }),
          this.dataBdService.getData({
            table: EBdTables.INVITE_TO_FAMILY,
            columns: 'user_email, author',
            filterType: EFilterType.EMAIL,
            filterField: 'user_email'
          },)])),
        map(([res, res2]) => {
          console.log(res2.data)
          const myFamily: any = res.data;
          if (myFamily.length) {
            model.myFamily = myFamily;
          }
          model.state = EState.READY;
          return model;
        })
      ))
    )
  }
}
