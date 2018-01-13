import { Component } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Component({
    selector: 'app-nav',
    template: `
        <mat-toolbar color="primary">
          <div fxLayoutAlign="space-bewteen center" class="nav-buttons">
            <div *ngIf="!(authService.user$ | async)?.uid">
              <button mat-button [routerLink]="['/login']">Login</button>
            </div>
            <div *ngIf="(authService.user$ | async)?.uid">
              <button mat-button [routerLink]="['/products']">Chocolates</button>
              <button mat-button (click)="authService.logout()">Logout</button>
            </div>
          </div>
        </mat-toolbar>
    `,
    styles: [`
        :host {
            display: block;
            background-color: #6d4c41;
        }
    `]
})
export class NavigationComponent {
    links = [
        { label: 'Products', path: 'products' }
    ];

    constructor(public authService: AuthenticationService) {}
    // Use users displayName, photoUrl
    // If user is logged in set current user to the user information
    // otherwise set it to null or {}??
    // User Model {name, avatar, email, provider, anything else}
}
