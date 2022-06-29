import { StateModel } from '../../../shared/models/state.model';

export class FamiliesModel extends StateModel {

  private _myFamily: any;

  constructor() {
    super();
  }


  public set myFamily(data: any) {
    this._myFamily = data;
  }

  public get myFamily(): any {
    return this._myFamily;
  }
}
