import { EState } from '../enum/state.enum';

export interface IModelWithState<T> {
  data?: T;
  state: EState;
}
