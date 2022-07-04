import { StateModel } from '../../../shared/models/state.model';
import { GroupModel } from './group.model';

export class GroupsModel extends StateModel {

  private _myGroups: GroupModel[];
  private _myInvitations: any;

  constructor() {
    super();
  }

  public set myGroups(data: GroupModel[]) {
    this._myGroups = data;
  }

  public get myGroups(): GroupModel[] {
    return this._myGroups;
  }

  public set myInvitations(data: any) {
    this._myInvitations = data;
  }

  public get myInvitations(): any {
    return this._myInvitations;
  }


}
