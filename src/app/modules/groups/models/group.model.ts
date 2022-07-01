import { IUserGroup } from '../interfaces/user-group.interface';

export class GroupModel {
  private _name: string;
  private _users: IUserGroup[];

  constructor() {
  }
}
