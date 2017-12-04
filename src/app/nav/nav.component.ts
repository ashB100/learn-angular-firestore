import { Component } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Component({
    selector: 'app-nav',
    template: `
        <mat-toolbar class="container" color="primary">Chocolates</mat-toolbar>
        
        <nav class="container" mat-tab-nav-bar backgroundColor="primary">
            <!--a mat-tab-link *ngFor="let link of links"
                [routerLink]="link.path"
                [active]="route.isActive"
                routerLinkActive #route="routerLinkActive">
                <span>{{ link.label }}</span>
            </a-->
            <a *ngIf="authService.isAuthenticated()"
               mat-tab-link
                [routerLink]="['/products']"
                routerLinkActive="active">
                <span>Products</span>
            </a>
            <a *ngIf="!authService.isAuthenticated()"
               mat-tab-link
               [routerLink]="['/login']"
               routerLinkActive="active">
                <span>Login</span>
            </a>
            <a *ngIf="authService.isAuthenticated()"
               mat-tab-link>
                <span>Welcome {{ authService.currentUser?.displayName}}</span>
            </a>

            <a *ngIf="authService.isAuthenticated()"
               mat-tab-link
               (click)="authService.logout()"
               routerLinkActive="active">
                <span>Logout</span>
            </a>
        </nav>
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
