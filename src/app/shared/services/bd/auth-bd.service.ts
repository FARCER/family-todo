import { Injectable } from '@angular/core';
import { GetSupabaseClientService } from './get-supabase-client.service';
import { from, Observable } from 'rxjs';
import { ILoginResponse } from '../../../modules/auth/interfaces/login-response.interface';
import { ILogoutResponse } from '../../../modules/auth/interfaces/logout-response.interface';
import { IRegisterResponse } from '../../../modules/auth/interfaces/register-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthBdService {

  constructor(
    private getSupabaseClientService: GetSupabaseClientService
  ) {
  }

  public register(email: string, password: string): Observable<IRegisterResponse> {
    return from(this.getSupabaseClientService.getSupabaseClient().auth.signUp({ email, password }))
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    return from(this.getSupabaseClientService.getSupabaseClient().auth.signIn({ email, password }))
  }

  public logout():Observable<ILogoutResponse> {
    return from(this.getSupabaseClientService.getSupabaseClient().auth.signOut());
  }

  public isAuthorized(): boolean {
    return !!this.getSupabaseClientService.getSupabaseClient().auth.session();
  }

  public updateAuthData(updateData: any):Observable<any> {
    return from(this.getSupabaseClientService.getSupabaseClient().auth.update(updateData))
  }
}
