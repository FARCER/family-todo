import { IUserGroup } from './user-group.interface';

export interface IActionWithUserGroupEmit {
  user: IUserGroup;
  groupId: string;
}
