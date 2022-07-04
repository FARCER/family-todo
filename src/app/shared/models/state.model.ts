import { EState } from '../enum/state.enum';

export class StateModel {

  private _state: EState = EState.LOADING;


  public get state(): EState {
    return this._state;
  }

  public set state(newState: EState) {
    this._state = newState;
  }

  public isLoading(): boolean {
    return this._state === EState.LOADING;
  }

  public isReady(): boolean {
    return this._state === EState.READY;
  }
}
