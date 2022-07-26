import { StateModel } from '../../../shared/models/state.model';
import { GroupModel } from './group.model';
import { IMyInvitation } from '../interfaces/my-invitation.interface';
import { IGroupWhereIMember } from '../interfaces/group-where-i-member.interface';

export class GroupsModel extends StateModel {

  private _myGroups: GroupModel[];
  private _myInvitations: IMyInvitation[];
  private _groupsWhereIMember: IGroupWhereIMember[];

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

  public set groupsWhereIMember(data: IGroupWhereIMember[]) {
    this._groupsWhereIMember = data;
  }

  public get groupsWhereIMember(): IGroupWhereIMember[] {
    return this._groupsWhereIMember;
  }


}
