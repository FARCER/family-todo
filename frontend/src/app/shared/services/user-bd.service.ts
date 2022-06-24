import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';

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

  get profile() {
    return this.getSupabaseClientService.getSupabaseClient()
      .from('profiles')
      .select(`email,name,surName,patronymic,dateOfBirth`)
      .eq('id', this.user?.id)
      .single();
  }
}
