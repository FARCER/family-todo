import { IUserGroup } from '../interfaces/user-group.interface';
import { IGroup } from '../interfaces/group.interface';
import { StateModel } from '../../../shared/models/state.model';

export class GroupModel extends StateModel{
  private readonly _id: string;
  private _name: string;
  private _users: IUserGroup[];

  constructor(data: IGroup) {
    super();
    this._name = data.name;
    this._users = data.users;
    this._id = data.id;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get users(): IUserGroup[] {
    return this._users;
  }
}
