import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);


    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
    })

  }

  get session() {
    return this.supabase.auth.session();
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
