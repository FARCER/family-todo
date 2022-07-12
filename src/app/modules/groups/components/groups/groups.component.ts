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
import { IInvitationAnswer } from '../../interfaces/invitation-answer.interface';

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
          columns: 'id, name, users:id(email, status, name, id, userId)',
          filterField: 'creatorId',
          filterType: EFilterType.ID
        }),
          this.getInvitedGroups()
        ])),
        map(([res, myInvitations]: [any, IMyInvitation[]]) => {
          model.myGroups = res.data.map((group: IGroup) => new GroupModel(group));
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

  public invitationResultEmit(answer: IInvitationAnswer, model: GroupsModel) {
    model.state = EState.LOADING;
    answer.accept ? this.acceptInvitation(answer.id) : this.refuseInvitation(answer.id)
  }

  private acceptInvitation(id: string): void {
    const data: any = {
      id,
      status: EUserGroupStatus.MEMBER,
      name: this.user.name
    }
    this.dataBdService.updateData(data, EBdTables.GROUPS_USERS, { id }).subscribe(
      (res: any) => {
        this.reloadGroups$.next(null);
      }
    )
  }

  private refuseInvitation(id: string): void {
    const data: any = {
      id,
      status: EUserGroupStatus.REFUSE
    }
    this.dataBdService.updateData(data, EBdTables.GROUPS_USERS, { id }).subscribe(
      () => this.reloadGroups$.next(null)
    )
  }

  public createGroup(groupName: string, model: GroupsModel) {
    const data = {
      creatorName: this.user.name,
      creatorId: this.user.id,
      name: groupName,
    }
    model.state = EState.LOADING;

    this.dataBdService.upsertData(data, EBdTables.GROUPS).pipe(
      switchMap((res: any) => this.updateUserGroupsTable(res.data.id))
    ).subscribe(
      () => {
        this.reloadGroups$.next(null)
      }
    )
  }

  private updateUserGroupsTable(id: string) {
    const data = {
      groupId: id,
      userId: this.user.id,
      author: this.user.name,
      email: this.user.email,
      status: EUserGroupStatus.AUTHOR,
      name: this.user.name
    }
    return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)
  }

  public deleteGroup(groupId: string, model: GroupsModel): void {
    model.state = EState.LOADING;
    this.dataBdService.deleteData({ groupId }, EBdTables.GROUPS_USERS).pipe(
      switchMap(() => this.dataBdService.deleteData({ id: groupId }, EBdTables.GROUPS))
    ).subscribe(
      () => {
        this.reloadGroups$.next(null);
      }
    )
  }
}
