import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { ToastService } from 'ad-kit';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { ELocalStorageKeys } from '../../../../shared/enum/local-storage-keys.enum';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { EUserGroupStatus } from '../../../../shared/enum/user-group-status.enum';
import { IUserGroup } from '../../interfaces/user-group.interface';
import { IInviteUserEmit } from '../../interfaces/invite-user-emit.interface';
import { IActionWithUserGroupEmit } from '../../interfaces/action-with-user-group-emit.interface';

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
  @Output() public actionWithGroupUser: EventEmitter<IActionWithUserGroupEmit> = new EventEmitter<IActionWithUserGroupEmit>();


  public model$: Observable<GroupModel>;
  private reloadGroup: BehaviorSubject<GroupModel>;

  private user: IProfile;

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
  }

  public actionWithUser(user: IUserGroup): void {
    this.actionWithGroupUser.emit({
      user,
      groupId: this.model.id
    })
  }

  public inviteToGroup(email: string): void {
    this.inviteUser.emit({ email, groupId: this.model.id, groupName: this.model.name });
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

}
