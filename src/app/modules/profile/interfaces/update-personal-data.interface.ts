import { IProfile } from './profile.interface';

export interface IUpdatePersonalData extends IProfile {
  updated_at: Date
}
