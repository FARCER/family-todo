import { StateModel } from '../../../shared/models/state.model';
import { GroupModel } from './group.model';
import { IMyInvitation } from '../interfaces/my-invitation.interface';

export class GroupsModel extends StateModel {

  private _myGroups: GroupModel[];
  private _myInvitations: IMyInvitation[];

  constructor() {
    super();
  }

  public set myGroups(data: GroupModel[]) {
    this._myGroups = data;
  }

  public get myGroups(): GroupModel[] {
    return this._myGroups;
  }

  public set myInvitations(data: IMyInvitation[]) {
    this._myInvitations = data;
  }

  public get myInvitations(): IMyInvitation[] {
    return this._myInvitations;
  }


}
