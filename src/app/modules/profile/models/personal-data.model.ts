import { IProfile } from '../interfaces/profile.interface';

export class PersonalDataModel {
  private _name: string;
  private _surName: string;
  private _patronymic: string;
  private _dateOfBirth: string
  private id?: string;

  constructor(profile: IProfile) {
    this._name = profile?.name || '';
    this._surName = profile?.surName || '';
    this._patronymic = profile?.patronymic || '';
    this._dateOfBirth = profile?.dateOfBirth || '';
  }

  public get name(): string {
    return this._name;
  }

  public get surName(): string {
    return this._surName;
  }

  public get patronymic(): string {
    return this._patronymic;
  }

  public get dateOfBirth(): string {
    return this._dateOfBirth;
  }

}
