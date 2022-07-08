import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';
import { EBdTables } from '../../enum/bd-tables.enum';
import { from, map, Observable, pluck } from 'rxjs';
import { IProfile } from '../../../modules/profile/interfaces/profile.interface';
import { EFilterType } from '../../enum/filter-type.enum';
import { ErrorCodes } from '../../enum/error-codes.enum';

@Injectable({
  providedIn: 'root'
})
export class UserBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService,
  ) {
  }

  public get session() {
    return this.getSupabaseClientService.getSupabaseClient().auth.session();
  }

  public get user() {
    return this.getSupabaseClientService.getSupabaseClient().auth.user();
  }

  public get profile(): Observable<IProfile> {
    return from(this.getSupabaseClientService.getSupabaseClient()
      .from(EBdTables.USERS)
      .select(`email,name,surName,patronymic,dateOfBirth,id`)
      .eq('id', this.user?.id)
      .single()).pipe(
      map((res: any) => this.checkEmptyUser(res)),
      pluck('data')
    );
  }

  private checkEmptyUser(res: any): { data: IProfile } {
    if (res?.error?.code === ErrorCodes.NOT_FOUND_IN_DATABASE) {
      return {
        data: {
          name: '',
          surName: '',
          patronymic: '',
          dateOfBirth: ''
        }
      }
    }
    return res;
  }
}
