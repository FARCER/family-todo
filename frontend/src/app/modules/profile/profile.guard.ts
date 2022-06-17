import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupabaseService } from '../../shared/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly supabaseService: SupabaseService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(Boolean(this.supabaseService.session));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(Boolean(this.supabaseService.session));
  }

}
