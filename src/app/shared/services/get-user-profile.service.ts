import { Injectable } from '@angular/core';
import { IProfile } from '../../modules/profile/interfaces/profile.interface';
import { LocalStorageService } from './local-storage.service';
import { ELocalStorageKeys } from '../enum/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class GetUserProfileService {

  public readonly user: IProfile;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem(ELocalStorageKeys.PROFILE))
  }

}
