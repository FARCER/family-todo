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

@Component({
  selector: 'ad-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  @Input() public model: GroupModel;
  @Output() public deleteGroupEmit: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('adInviteToGroup') private inviteToGroupComponent: InviteToGroupComponent;

  public model$: Observable<GroupModel>;
  private reloadGroup: BehaviorSubject<GroupModel>;

  private user: IProfile;
  private invitedUserEmail: string = '';
  private isResendInvite: boolean = false;
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
      switchMap((model: GroupModel) => !!this.invitedUserEmail ? this.inviteUserToGroup(model, this.invitedUserEmail) : of(model)),
      switchMap((model: GroupModel) => !!this.isResendInvite ? this.resendInvite(model) : of(model)),
      switchMap((model: GroupModel) => !!this.isCancelInvite ? this.cancelInvite(model) : of(model)),
      map((model: GroupModel) => {
        model.state = EState.READY;
        return model
      })
    );
  }

  public inviteUserToGroupWrapper(model: GroupModel, email: string): void {
    this.invitedUserEmail = email;
    this.reloadGroup.next(model);
  }

  public inviteUserToGroup(model: GroupModel, email: string): Observable<GroupModel> {
    model.state = EState.LOADING;
    this.inviteToGroupComponent.form.reset();
    return this.getUserId(email).pipe(
      switchMap((userId: string) => {
        const data = {
          groupId: model.id,
          email,
          author: this.user.name,
          userId,
        }
        return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)
      }),
      switchMap(() => this.updateGroupData(model.id)),
      map((model: GroupModel) => {
        this.toastService.show({
          text: 'Пользователь успешно приглашен в вашу группу',
          type: 'success'
        })
        this.invitedUserEmail = '';
        return model;
      }),
      catchError(() => {
        return of(model);
      }),
    )
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

  private getUserId(email: string): Observable<string> {
    return this.dataBdService.getUserByEmail(email).pipe(
      switchMap((res: any) => {
        if (res?.error?.code === ErrorCodes.NOT_FOUND_IN_DATABASE) {
          this.toastService.show({
            text: 'Пользователя с указанным e-mail не существует',
            type: 'info'
          })
          return throwError(() => new Error('123'));
        }
        const user = res.data;
        return of(user.id || '');
      })
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
    if (user.status === EUserGroupStatus.REFUSE) {
      this.isResendInvite = true;
      this.reloadGroup.next(model)
    }
    if (user.status === EUserGroupStatus.INVITED) {
      this.isCancelInvite = true;
      this.reloadGroup.next(model)
    }
  }

  private cancelInvite(model: GroupModel): Observable<GroupModel> {
    model.state = EState.LOADING;
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

  private resendInvite(model: GroupModel): Observable<GroupModel> {
    model.state = EState.LOADING;
    const data: any = {
      status: EUserGroupStatus.INVITED
    }
    return this.dataBdService.updateData(data, EBdTables.GROUPS_USERS, { id: this.currentUser.id }).pipe(
      switchMap((res: any) => this.updateGroupData(model.id)),
      map((model: GroupModel) => {
        this.toastService.show({
          text: 'Приглашение отправлено повторно',
          type: 'success'
        })
        this.currentUser = null;
        this.isResendInvite = false;
        return model;
      }),
    )
  }

}
