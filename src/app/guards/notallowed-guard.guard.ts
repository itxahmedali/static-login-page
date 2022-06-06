import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth/auth-guard.service';

@Injectable({
    providedIn: 'root'
})

export class NotallowedGuardGuard implements CanActivate {

    constructor(private authService: AuthGuardService,
        private router: Router) { }

        canActivate(next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          // Guard for if user is login
          let post = (localStorage.getItem('catalogReadPermission'));
          let user = (localStorage.getItem('userReadPermission'));
          if (post == 'true' || user == 'true') {
            if(user == 'true'){
              this.router.navigate(['/users']);
              return true
            }
            if(post == 'true'){
              this.router.navigate(['/posts']);
              return true
            }
          }
          return true
        }
}
