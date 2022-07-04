import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { GroupsModel } from '../../models/groups.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';
import { GetUserProfileService } from '../../../../shared/services/get-user-profile.service';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { GroupModel } from '../../models/group.model';
import { IGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'ad-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  public myGroups$: Observable<GroupsModel>;

  private user: IProfile;
  public reloadGroups$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService,
    private getUserProfileService: GetUserProfileService,
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
          columns: 'id,name, users:id(email,status)',
          filterField: 'creatorId',
          filterType: EFilterType.ID
        }),
          this.dataBdService.getData({
            table: EBdTables.GROUPS_USERS,
            columns: 'author',
            filterType: EFilterType.EMAIL,
            filterField: 'email'
          })
        ])),
        map(([res, res2]) => {
          console.log(res2)
          const myGroups: GroupModel[] = res.data.map((group: IGroup) => new GroupModel(group));
          const myInvitations: any = res2.data;
          if (myGroups?.length) {
            model.myGroups = myGroups;
          }
          if (myInvitations.length) {
            model.myInvitations = myInvitations;
          }
          model.state = EState.READY;
          return model;
        })
      ))
    )
  }

  public createGroup() {

  }
}
