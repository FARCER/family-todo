import { IUserGroup } from './user-group.interface';

export interface IGroup {
  id: string;
  users: IUserGroup[];
  name: string;
}
