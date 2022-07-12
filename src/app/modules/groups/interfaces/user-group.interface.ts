import { EUserGroupStatus } from '../../../shared/enum/user-group-status.enum';

export class IUserGroup {
  id: string;
  email: string;
  status: EUserGroupStatus;
  name: string;
  userId: string;
}
