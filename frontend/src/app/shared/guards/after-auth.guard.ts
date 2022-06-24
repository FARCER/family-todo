import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserBdService } from '../services/user-bd.service';

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly userBdService: UserBdService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(Boolean(this.userBdService.session));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(Boolean(this.userBdService.session));
  }

}
