import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthBdService } from '../../shared/services/bd/auth-bd.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authBdService: AuthBdService
  ) {
  }

  canActivate(): Observable<boolean> {
    return of(!this.authBdService.isAuthorized());
  }

  canActivateChild(): Observable<boolean> {
    return of(!this.authBdService.isAuthorized());
  }

}
