import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { ErrorCodes } from '../../../shared/enum/error-codes.enum';
import { DataBdService } from '../../../shared/services/bd/data-bd.service';
import { ToastService } from 'ad-kit';
import { GroupModel } from '../models/group.model';
import { EBdTables } from '../../../shared/enum/bd-tables.enum';
import { IProfile } from '../../profile/interfaces/profile.interface';
import { ELocalStorageKeys } from '../../../shared/enum/local-storage-keys.enum';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { IInviteUserEmit } from '../interfaces/invite-user-emit.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private user: IProfile;

  constructor(
    private dataBdService: DataBdService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE));
  }

  public inviteUserToGroup({ email, groupId }: IInviteUserEmit): Observable<GroupModel> {
    return this.getUserId(email).pipe(
      switchMap((userId: string) => {
        const data = {
          groupId,
          email,
          author: this.user.name,
          userId,
        }
        return this.dataBdService.createData(data, EBdTables.GROUPS_USERS)
      }),
      switchMap(() => this.updateGroupData(groupId)),
      map((model: GroupModel) => {
        this.toastService.show({
          text: 'Пользователь успешно приглашен в вашу группу',
          type: 'success'
        })
        return model;
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
      map((res: any) => res.data && new GroupModel(res.data))
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
}
