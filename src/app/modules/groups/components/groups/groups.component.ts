import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, Observable, startWith, switchMap, tap } from 'rxjs';
import { GroupsModel } from '../../models/groups.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { EUserGroupStatus } from '../../../../shared/enum/user-group-status.enum';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { IInvitationAnswer } from '../../interfaces/invitation-answer.interface';
import { IModelWithState } from '../../../../shared/interfaces/model-with-state.interface';
import { GroupsService } from '../../services/groups.service';
import { GroupService } from '../../services/group.service';
import { IInviteUserEmit } from '../../interfaces/invite-user-emit.interface';
import { IActionWithUserGroupEmit } from '../../interfaces/action-with-user-group-emit.interface';

@Component({
  selector: 'ad-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  public myGroups$: Observable<IModelWithState<GroupsModel>>;
  public reloadGroups$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private user: IProfile;

  constructor(
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService,
    private groupsService: GroupsService,
    private groupService: GroupService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.myGroups$ = this.reloadGroups$.pipe(
      switchMap(() => this.groupsService.getGroupsModel()),
      tap(() => {
        this.loader$.next(false);
      }),
      startWith({ state: EState.LOADING })
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
      () => {
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

  public createGroup(groupName: string) {
    this.loader$.next(true);
    this.groupsService.createGroup(groupName).subscribe(
      () => {
        this.reloadGroups$.next(null)
      }
    )
  }

  public deleteGroup(groupId: string): void {
    this.loader$.next(true)
    this.groupsService.deleteGroup(groupId).subscribe(
      () => {
        this.reloadGroups$.next(null);
      }
    )
  }

  public inviteUser(data: IInviteUserEmit): void {
    this.loader$.next(true);
    this.groupService.inviteUserToGroup(data).subscribe(
      () => {
        this.reloadGroups$.next(null);
      }
    )
  }

  public actionWithGroupUser({ user, groupId }: IActionWithUserGroupEmit): void {
    this.loader$.next(true);
    if ([EUserGroupStatus.REFUSE, EUserGroupStatus.MEMBER].includes(user.status)) {
      this.groupService.updateUserStatus(user, groupId).subscribe(
        () => {
          this.reloadGroups$.next(null)
        }
      )
    }
    if (user.status === EUserGroupStatus.INVITED) {
      this.groupService.cancelInvite(user, groupId).subscribe(
        () => {
          this.reloadGroups$.next(null)
        }
      )
    }
  }

}
