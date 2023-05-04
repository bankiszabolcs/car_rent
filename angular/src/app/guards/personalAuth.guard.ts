import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('accessToken')) {
      return this.authService.me().pipe(
        map((minimalUser) => {
          const canShow =
            minimalUser.user.role === 'admin' ||
            minimalUser.user.role === 'user';
          if (canShow) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
