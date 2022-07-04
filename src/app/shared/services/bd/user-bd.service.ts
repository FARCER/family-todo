import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';
import { EBdTables } from '../../enum/bd-tables.enum';
import { from, Observable, pluck } from 'rxjs';
import { IProfile } from '../../../modules/profile/interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService
  ) {
  }

  get session() {
    return this.getSupabaseClientService.getSupabaseClient().auth.session();
  }

  get user() {
    return this.getSupabaseClientService.getSupabaseClient().auth.user();
  }

  get profile(): Observable<IProfile> {
    return from(this.getSupabaseClientService.getSupabaseClient()
      .from(EBdTables.USERS)
      .select(`name,surName,patronymic,dateOfBirth,id`)
      .eq('id', this.user?.id)
      .single()).pipe(
      pluck('data')
    );
  }
}
