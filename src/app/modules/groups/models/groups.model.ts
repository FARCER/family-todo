import { StateModel } from '../../../shared/models/state.model';
import { GroupModel } from './group.model';

export class GroupsModel extends StateModel {

  private _myGroups: GroupModel[];

  constructor() {
    super();
  }


  public set myGroups(data: GroupModel[]) {
    this._myGroups = data;
  }

  public get myGroups(): GroupModel[] {
    return this._myGroups;
  }
}
