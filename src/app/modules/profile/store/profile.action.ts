import { Action } from '@ngrx/store';
import { IProfile } from '../interfaces/profile.interface';

export enum EUserActions {
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success'
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor() {
  }
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IProfile) {
  }
}

export type UserActions = GetUser | GetUserSuccess;
