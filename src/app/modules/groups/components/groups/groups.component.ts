import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, pluck, switchMap } from 'rxjs';
import { GroupsModel } from '../../models/groups.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { GroupModel } from '../../models/group.model';
import { IGroup } from '../../interfaces/group.interface';
import { EUserGroupStatus } from '../../../../shared/enum/user-group-status.enum';
import { IUserGroupStatus } from '../../interfaces/user-group-status.interface';
import { IMyInvitation } from '../../interfaces/my-invitation.interface';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';

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
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.myGroups$ = of(new GroupsModel()).pipe(
      switchMap((model: GroupsModel) => combineLatest([this.reloadGroups$]).pipe(
        switchMap(() => forkJoin([this.dataBdService.getData({
          table: EBdTables.GROUPS,
          columns: 'id, name, users:id(email, status, name)',
          filterField: 'creatorId',
          filterType: EFilterType.ID
        }),
          this.getInvitedGroups()
        ])),
        map(([res, res2]: [any, IMyInvitation[]]) => {
          const myGroups: GroupModel[] = res.data.map((group: IGroup) => new GroupModel(group));
          const myInvitations: IMyInvitation[] = res2;
          if (myGroups?.length) {
            model.myGroups = myGroups;
          }
          model.myInvitations = myInvitations;
          model.state = EState.READY;
          return model;
        })
      ))
    )
  }

  private getInvitedGroups(): Observable<any> {
    return this.dataBdService.getData({
      table: EBdTables.GROUPS_USERS,
      columns: 'id, author, status',
      filterType: EFilterType.EMAIL,
      filterField: 'email'
    }).pipe(
      pluck('data'),
      map((res: IUserGroupStatus[]) => res.filter((t: IUserGroupStatus) => t.status === EUserGroupStatus.INVITED))
    )
  }

  public declineInvitationEmit(id: string, model: GroupsModel) {
    model.state = EState.LOADING;

    this.dataBdService.deleteData(id, EBdTables.GROUPS_USERS).subscribe(
      () => this.reloadGroups$.next(null)
    )
  }
}
