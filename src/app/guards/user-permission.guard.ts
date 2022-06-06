import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth/auth-guard.service';

@Injectable({
  providedIn: 'root'
})

export class UserPermissionGuard implements CanActivate {

  constructor(private authService: AuthGuardService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for if user is login
    let user = (localStorage.getItem('userReadPermission'));
    let post = (localStorage.getItem('catalogReadPermission'));
    if (user == 'false') {
      if (post == 'true') {
        this.router.navigate(['/posts']);
        return true
      }
      else {
        if (user == 'false' && post == 'false') {
          this.router.navigate(['']);
          return true
        }
        if (post == 'true') {
          this.router.navigate(['/posts']);
          return true
        }
      }
    }
    return true
  }
}
