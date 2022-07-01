import { StateModel } from '../../../shared/models/state.model';

export class GroupsModel extends StateModel {

  private _myGroups: any;

  constructor() {
    super();
  }


  public set myGroups(data: any) {
    this._myGroups = data;
  }

  public get myGroups(): any {
    return this._myGroups;
  }
}
