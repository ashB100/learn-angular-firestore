
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$
      .map(user => {
        if (user && user.uid) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
