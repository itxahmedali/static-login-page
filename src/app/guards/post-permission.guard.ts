import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth/auth-guard.service';

@Injectable({
    providedIn: 'root'
})

export class PostPermissionGuard implements CanActivate {

    constructor(private authService: AuthGuardService,
        private router: Router) { }

        canActivate(next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          // Guard for if user is login
          let post = (localStorage.getItem('catalogReadPermission'));
          let user = (localStorage.getItem('userReadPermission'));
          if (post == 'false') {
            if (user == 'true') {
              this.router.navigate(['/users']);
              return true
            }
            else{
              if(user == 'false' && post == 'false'){
                this.router.navigate(['']);
                return true
              }
              if(user == 'true'){
                this.router.navigate(['/users']);
                return true
              }
            }
          }
          return true
        }
}
