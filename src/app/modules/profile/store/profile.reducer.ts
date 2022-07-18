import { initialState, IProfileState } from './profile.state';
import { EUserActions, UserActions } from './profile.action';
import { EState } from '../../../shared/enum/state.enum';

export const profileReducer = (
  state: IProfileState = initialState,
  action: UserActions
): IProfileState => {
  switch (action.type) {
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        user: action.payload,
        state: EState.READY
      };
    }

    default:
      return state;
  }
};
