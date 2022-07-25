import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, pluck, switchMap } from 'rxjs';
import { IGroup } from '../interfaces/group.interface';
import { EBdTables } from '../../../shared/enum/bd-tables.enum';
import { EFilterType } from '../../../shared/enum/filter-type.enum';
import { IUserGroupStatus } from '../interfaces/user-group-status.interface';
import { EUserGroupStatus } from '../../../shared/enum/user-group-status.enum';
import { DataBdService } from '../../../shared/services/bd/data-bd.service';
import { IMyInvitation } from '../interfaces/my-invitation.interface';
import { GroupsModel } from '../models/groups.model';
import { GroupModel } from '../models/group.model';
import { EState } from '../../../shared/enum/state.enum';
import { IModelWithState } from '../../../shared/interfaces/model-with-state.interface';
import { ELocalStorageKeys } from '../../../shared/enum/local-storage-keys.enum';
import { IProfile } from '../../profile/interfaces/profile.interface';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private user: IProfile;

  constructor(
    private dataBdService: DataBdService,
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  public getGroupsModel(): Observable<IModelWithState<GroupsModel>> {
    return forkJoin([
      this.getGroups(),
      this.getInvitedGroups()
    ]).pipe(
      map(([groups, myInvitations]: [IGroup[], IMyInvitation[]]) => {
        const groupsModel: GroupsModel = new GroupsModel();
        groupsModel.myGroups = groups.map((group: IGroup) => new GroupModel(group));
        groupsModel.myInvitations = myInvitations;
        groupsModel.state = EState.READY;
        return { state: EState.READY, data: groupsModel };
      })
    )
  }


  private getGroups(): Observable<IGroup[]> {
    return this.dataBdService.getData({
      table: EBdTables.GROUPS,
      columns: 'id, name, users:id(email, status, name, id, userId)',
      filterField: 'creatorId',
      filterType: EFilterType.ID
    }).pipe(
      map((res: any) => res.data)
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

  public createGroup(groupName: string): Observable<any> {
    const data = {
      creatorName: this.user.name,
      creatorId: this.user.id,
      name: groupName,
    }
    return this.dataBdService.upsertData(data, EBdTables.GROUPS).pipe(
      switchMap((res: any) => this.updateUserGroupsTable(res.data.id))
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

  public deleteGroup(groupId: string): Observable<any> {
    return this.dataBdService.deleteData({ groupId }, EBdTables.GROUPS_USERS).pipe(
      switchMap(() => this.dataBdService.deleteData({ id: groupId }, EBdTables.GROUPS))
    )
  }

}
