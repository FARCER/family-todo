import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { GroupsModel } from '../../models/groups.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';
import { GetUserProfileService } from '../../../../shared/services/get-user-profile.service';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';

@Component({
  selector: 'ad-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public myGroups$: Observable<GroupsModel>;

  private user: IProfile;
  private reloadGroups$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
    this.myGroups$ = of(new GroupsModel()).pipe(
      switchMap((model: GroupsModel) => combineLatest([this.reloadGroups$]).pipe(
        switchMap(() => forkJoin([this.dataBdService.getData({
          table: EBdTables.GROUPS,
          columns: 'id,name',
          filterField: 'creatorId',
          filterType: EFilterType.ID
        })])),
        map(([res]) => {
          console.log(res.data)
          const myFamily: any = res.data;
          if (myFamily?.length) {
            model.myGroups = myFamily;
          }
          model.state = EState.READY;
          return model;
        })
      ))
    )
  }
}
