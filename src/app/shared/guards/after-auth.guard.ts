import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserBdService } from '../services/user-bd.service';
import { AuthBdService } from '../services/auth-bd.service';

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authBdService: AuthBdService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(this.authBdService.isAuthorized());
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(this.authBdService.isAuthorized());
  }

}
