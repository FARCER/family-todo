import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService
  ) {
  }

  public register(email: string, password: string) {
    return this.getSupabaseClientService.getSupabaseClient().auth.signUp({ email, password })
  }

  public login(email: string, password: string) {
    return this.getSupabaseClientService.getSupabaseClient().auth.signIn({ email, password })
  }

  public logout() {
    return this.getSupabaseClientService.getSupabaseClient().auth.signOut();
  }
}
