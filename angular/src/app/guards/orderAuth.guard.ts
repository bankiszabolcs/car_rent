import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth/auth.service';
import { User } from '../model/user';
import { OrderService } from '../service/order.service';

@Injectable({
  providedIn: 'root',
})
export class OrderAuthGuardService implements CanActivate {
  actualUser: User | null = null;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('accessToken')) {
      let actualUser: any;
      let orderId: any;
      let userId;
      const first = this.authService.me().pipe(
        tap((minimalUser) => {
          actualUser = minimalUser.user;
          orderId = route.params['id'];
        })
      );
      const second = first.pipe(
        mergeMap(() => {
          return this.orderService.get(orderId).pipe(
            map((order) => {
              userId = order.userId!._id;

              const canShow =
                actualUser?.role === 'admin' ||
                (actualUser?.role === 'user' && userId === actualUser?.user_id);
              if (canShow) {
                return true;
              } else {
                return false;
              }
            })
          );
        })
      );
      return second;
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
