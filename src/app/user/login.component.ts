import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {SupportedProvider} from './authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'login',
  template: `
      <div fxLayout="column">
          <mat-card>
            <button *ngFor="let prov of providers"
                    mat-raised-button
                    (click)="login(prov)">
                Login with {{prov}}
            </button>
          </mat-card>
      </div>
  `,
  styles: [`
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  providers = Object.values(SupportedProvider);

  /*providers =  Object.keys(SupportedProvider)
    .filter(key => !isNaN(Number(SupportedProvider[key])
  )); */

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login(provider: SupportedProvider) {
    this.subscription = this.authService.login(provider)
      .subscribe({
        next: (user: any) => {
          this.router.navigate(['products']);
        },
        error: (err: any ) => console.log(err),
        complete: () => console.log('completed')
      });
  }

  logout() {
    this.authService.logout();
  }
}
