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

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login(provider: SupportedProvider) {
    this.subscription = this.authService.login(provider)
      .subscribe({
        next: (user: any) => {
          this.router.navigateByUrl('/products');
        },
        error: (err: any ) => console.log(err),
        complete: () => console.log('completed')
      });
  }

  logout() {
    this.authService.logout();
  }
}
