import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EUserActions, GetUser, GetUserSuccess } from './profile.action';
import { map, switchMap } from 'rxjs';
import { UserBdService } from '../../../shared/services/bd/user-bd.service';
import { Injectable } from '@angular/core';
import { IProfile } from '../interfaces/profile.interface';


@Injectable()
export class ProfileEffects {

  constructor(
    private actions: Actions,
    private userBdService: UserBdService
  ) {
  }

  getProfile$ = createEffect(() => {
    return this.actions.pipe(
      ofType<GetUser>(EUserActions.GetUser),
      switchMap(() => this.userBdService.profile),
      map((user: IProfile) => {
        console.log(user);
        return new GetUserSuccess(user);
      })
    )
  })
}
