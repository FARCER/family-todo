import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, pluck, switchMap, throwError } from 'rxjs';
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

@Component({
  selector: 'ad-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  @Input() public model: GroupModel;
  @ViewChild('adInviteToGroup') private inviteToGroupComponent: InviteToGroupComponent;

  public model$: Observable<GroupModel>;
  private reloadGroup: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private isNeedReload: boolean;
  private inviteUserEmail: string;
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
    this.initModel();
  }

  private initModel(): void {
    this.model$ = of(this.model).pipe(
      switchMap((model: GroupModel) => combineLatest([this.reloadGroup]).pipe(
        switchMap(() => this.isNeedReload ? this.inviteUserToGroup(model) : of(model)),
        map((actualModel: GroupModel) => {
          actualModel.state = EState.READY;
          return actualModel
        })
      ))
    );
  }

  private inviteUserToGroup(model: GroupModel): Observable<GroupModel> {
    model.state = EState.LOADING;
    return this.getUserId().pipe(
      switchMap((user_id: string) => {
        const data = {
          group_id: model.id,
          email: this.inviteUserEmail,
          author: this.user.name,
          user_id,
        }
        return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)
      }),
      switchMap(() => this.updateGroupData(model.id)),
      catchError(() => {
        return of(model);
      }),
    )
  }

  private updateGroupData(groupId: string): Observable<GroupModel> {
    return this.dataBdService.getOneData(
      {
        table: EBdTables.GROUPS,
        columns: 'id, name, users:id(email, status, name)',
        filterField: 'id',
        customFilterField: groupId,
      }
    ).pipe(
      pluck('data'),
      map((res: IGroup) => {
        this.isNeedReload = false;
        this.inviteUserEmail = '';
        this.inviteToGroupComponent.form.reset();
        this.toastService.show({
          text: 'Пользователь успешно приглашен в вашу группу',
          type: 'success'
        })
        return new GroupModel(res);
      })
    )
  }

  public updateGroup(email: string): void {
    this.isNeedReload = true
    this.inviteUserEmail = email;
    this.reloadGroup.next(null);
  }

  private getUserId(): Observable<string> {
    return this.dataBdService.getUserByEmail(this.inviteUserEmail).pipe(
      switchMap((res: any) => {
        if (res.error.code === ErrorCodes.NOT_FOUND_IN_DATABASE) {
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
}
