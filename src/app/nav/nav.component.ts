import { Component } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

@Component({
    selector: 'app-nav',
    template: `
        <nav mat-tab-nav-bar backgroundColor="primary">
            <a mat-tab-link *ngFor="let link of links"
                [routerLink]="link.path"
                [active]="route.isActive"
                routerLinkActive #route="routerLinkActive">
                <span>{{ link.label }}</span>
            </a>
            <a mat-tab-link
                routerLink="/login"
                routerLinkActive="active"
                *ngIf="!authService.isAuthenticated()">
                <span>Login</span>
            </a>
            <a mat-tab-link>
                <span *ngIf="authService.isAuthenticated()">Welcome {{ authService.currentUser.displayName}}</span>    
            </a>
            
            <a mat-tab-link
               (click)="authService.logout()"
               routerLinkActive="active"
               *ngIf="authService.isAuthenticated()">
                <span>Logout</span>
            </a>
        </nav>
    `,
    styles: [`
    `]
})
export class NavigationComponent {
    links = [
        { label: 'Products', path: 'products' }
    ];

    constructor(public authService: AuthenticationService) {}

    // Subscribe to auth.onAuthStateChanged
    // Use users displayName, photoUrl
    // If user is logged in set current user to the user information
    // otherwise set it to null or {}??
    // User Model {name, avatar, email, provider, anything else}
}
