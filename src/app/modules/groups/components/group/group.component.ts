import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { BehaviorSubject, catchError, map, Observable, of, pluck, switchMap, throwError } from 'rxjs';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { IGroup } from '../../interfaces/group.interface';
import { EState } from '../../../../shared/enum/state.enum';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { ToastService } from 'ad-kit';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { InviteToGroupComponent } from '../invite-to-group/invite-to-group.component';
import { ErrorCodes } from '../../../../shared/enum/error-codes.enum';
import { EUserGroupStatus } from '../../../../shared/enum/user-group-status.enum';
import { IUserGroup } from '../../interfaces/user-group.interface';
import { IInviteUserEmit } from '../../interfaces/invite-user-emit.interface';

@Component({
  selector: 'ad-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  @Input() public model: GroupModel;
  @Output() public deleteGroupEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() public inviteUser: EventEmitter<IInviteUserEmit> = new EventEmitter<IInviteUserEmit>();

  @ViewChild('adInviteToGroup') private inviteToGroupComponent: InviteToGroupComponent;

  public model$: Observable<GroupModel>;
  private reloadGroup: BehaviorSubject<GroupModel>;

  private user: IProfile;
  private isNeedUpdateUserStatus: boolean = false;
  private isCancelInvite: boolean = false;
  private currentUser: IUserGroup;

  constructor(
    private dataBdService: DataBdService,
    private userBdService: UserBdService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  ngOnInit(): void {
    this.reloadGroup = new BehaviorSubject<GroupModel>(this.model);
    this.initModel();
  }

  private initModel(): void {
    this.model$ = this.reloadGroup.pipe(
      switchMap((model: GroupModel) => !!this.isNeedUpdateUserStatus ? this.updateUserStatus(model) : of(model)),
      switchMap((model: GroupModel) => !!this.isCancelInvite ? this.cancelInvite(model) : of(model)),
    );
  }

  public inviteToGroup(email: string): void {
    this.inviteUser.emit({ email, groupId: this.model.id });
  }

  private updateGroupData(groupId: string): Observable<GroupModel> {
    return this.dataBdService.getOneData(
      {
        table: EBdTables.GROUPS,
        columns: 'id, name, users:id(email, status, name, id, userId)',
        filterField: 'id',
        customFilterField: groupId,
      }
    ).pipe(
      pluck('data'),
      map((res: IGroup) => new GroupModel(res))
    )
  }

  public deleteGroup(model: GroupModel): void {
    this.deleteGroupEmit.emit(model.id)
  }

  public isNotGroupAuthor(status: EUserGroupStatus): boolean {
    return status !== EUserGroupStatus.AUTHOR;
  }

  public getButtonTitle(status: EUserGroupStatus): string {
    switch (status) {
      case EUserGroupStatus.MEMBER:
        return 'Удалить';
      case EUserGroupStatus.REFUSE:
        return 'Отправить повторно'
      case EUserGroupStatus.INVITED:
        return 'Отменить приглашение'
      default:
        return ''
    }
  }

  public actionWithGroupUser(user: IUserGroup, model: GroupModel): void {
    this.currentUser = user;
    if ([EUserGroupStatus.REFUSE, EUserGroupStatus.MEMBER].includes(user.status)) {
      this.isNeedUpdateUserStatus = true;
      this.reloadGroup.next(model)
    }
    if (user.status === EUserGroupStatus.INVITED) {
      this.isCancelInvite = true;
      this.reloadGroup.next(model)
    }
  }

  private cancelInvite(model: GroupModel): Observable<GroupModel> {
    return this.dataBdService.deleteData({ id: this.currentUser.id }, EBdTables.GROUPS_USERS).pipe(
      switchMap(() => this.updateGroupData(model.id)),
      map((model: GroupModel) => {
        this.toastService.show({
          text: 'Приглашение успешно отменено',
          type: 'success'
        })
        this.currentUser = null;
        this.isCancelInvite = false;
        return model;
      }))
  }

  private updateUserStatus(model: GroupModel): Observable<GroupModel> {
    const data: any = {
      status: this.getNewUserStatus(this.currentUser.status)
    }
    return this.dataBdService.updateData(data, EBdTables.GROUPS_USERS, { id: this.currentUser.id }).pipe(
      switchMap(() => this.updateGroupData(model.id)),
      map((model: GroupModel) => {
        this.toastService.show({
          text: this.getUserMessage(this.currentUser.status),
          type: 'success'
        })
        this.currentUser = null;
        this.isNeedUpdateUserStatus = false;
        return model;
      }),
    )
  }

  private getUserMessage(currentStatus: EUserGroupStatus): string {
    switch (currentStatus) {
      case EUserGroupStatus.REFUSE:
        return 'Приглашение отправлено повторно';
      case EUserGroupStatus.MEMBER:
        return 'Пользователь успешно исключен из группы'
      default:
        return ''
    }
  }

  private getNewUserStatus(currentStatus: EUserGroupStatus): EUserGroupStatus {
    switch (currentStatus) {
      case EUserGroupStatus.REFUSE:
        return EUserGroupStatus.INVITED;
      case EUserGroupStatus.MEMBER:
        return EUserGroupStatus.REMOVED
      default:
        return EUserGroupStatus.REMOVED
    }
  }

}
