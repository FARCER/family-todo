import { IProfile } from '../interfaces/profile.interface';
import { EState } from '../../../shared/enum/state.enum';

export interface IProfileState {
  user: IProfile;
  state: EState;
}

export const initialState: IProfileState = {
  user: null,
  state: EState.EMPTY
}
