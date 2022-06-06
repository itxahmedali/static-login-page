import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth/auth-guard.service';

@Injectable({
    providedIn: 'root'
})

export class InnerGuardGuard implements CanActivate {

    constructor(private authService: AuthGuardService,
        private router: Router) { }

        canActivate(next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          // Guard for if user is login
          let user = (localStorage.getItem('access_token'));
          if (user) {
            if (Object.keys(user).length > -1) {
              this.router.navigate(['']);
              return true
            }
          }
          return true
        }
}
