import { EUserGroupStatus } from '../../../shared/enum/user-group-status.enum';

export interface IMyInvitation {
  id: string;
  author: string;
  status: EUserGroupStatus
}
