import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { IProfile } from '../../modules/profile/interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);


    // this.supabase.auth.onAuthStateChange((event, session) => {
    //   console.log(event, session)
    // })

  }

  get session() {
    return this.supabase.auth.session();
  }

  get user() {
    return this.supabase.auth.user();
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`email,name,surName,patronymic,dateOfBirth`)
      .eq('id', this.user?.id)
      .single();
  }


  public updateData(profile: IProfile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date(),
    }
    return this.supabase.from('profiles').upsert(update)
  }

  public register(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password })
  }

  public login(email: string, password: string) {
    return this.supabase.auth.signIn({ email, password })
  }

  public logout() {
    return this.supabase.auth.signOut();
  }

}
