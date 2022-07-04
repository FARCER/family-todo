import { StateModel } from '../../../shared/models/state.model';
import { PersonalDataModel } from './personal-data.model';

export class Profile extends StateModel {

  private _email: string;
  private _personalData: PersonalDataModel;

  constructor() {
    super();
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email
  }

  public get personalData(): PersonalDataModel {
    return this._personalData;
  }

  public set personalData(data: PersonalDataModel) {
    this._personalData = data
  }


}
