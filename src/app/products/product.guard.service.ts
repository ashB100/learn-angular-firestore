
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../user/authentication.service';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    console.log(route, state);
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    return Observable
        .of(isAuthenticated)
        .do((allowed: boolean) => {
          if (!allowed) {
            this.router.navigateByUrl('/login');
          }
        });
  }
}
