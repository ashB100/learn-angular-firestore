import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SupportedProvider } from './authentication.service';

@Component({
    template: `
        <div fxLayout="column">
            <mat-card fxLayout="column">
                <h2>Login</h2>
 
                <mat-card-content fxLayout="column">
                    <button >Login with Email</button>
                    <button mat-raised-button (click)="login('Google')">
                        <mat-icon></mat-icon>Login with Google
                    </button>
                    <button mat-raised-button (click)="login('Twitter')">
                        <mat-icon>home</mat-icon> Login with Twitter
                    </button>
                    <button mat-raised-button (click)="login('Github')">
                        <mat-icon></mat-icon>Login with Github
                    </button>
                    <button mat-raised-button (click)="login('Facebook')">Login with Facebook</button>

                </mat-card-content>

            </mat-card>
        </div>
    `,
    styles: [`
    `]
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthenticationService, private router: Router) {}

    ngOnInit() {}

    login(provider: SupportedProvider) {
        this.authService.login(provider)
            .then(credentials => {
                this.router.navigate(['products'])
                    .then(user => console.log('current user', this.authService.currentUser));
            },
            error => {
                console.log('error', error);
            });
    }

    logout() {
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            });
    }
}