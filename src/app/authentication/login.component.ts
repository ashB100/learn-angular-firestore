import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
//import { Router } from '@angular/router';
//import { moveIn } from '../router.animations';

@Component({
    selector: 'login',
    template: `
    <div *ngIf="authState$ | async; let user; else showLogin">
    <h1>Hello {{ user.displayName }}!</h1>
    <button (click)="logout()">Logout</button>
  </div>
  
  <ng-template #showLogin>
    <p>Please login.</p>
    <button >Login with Email</button>
    <button (click)="login('google')">Login with Google</button>
    <button (click)="login('twitter')">Login with Twitter</button>
    <button (click)="login('github')">Login with Github</button>
    <button (click)="login('facebook')">Login with Facebook</button>
  </ng-template>
    `,
    styles: [`
    
    `],
    //animations: [moveIn()],
    //host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
    authState$: Observable<any>;

    constructor(private authService: AuthenticationService, private router: Router) {}

    ngOnInit() { 
        this.authState$ = this.authService.authState();
    }
    
    login(provider:string) {
        this.authService.login(provider)
            .then(credentials => {
                console.log('login credentials', credentials);
                this.router.navigateByUrl('/products');
            },
            error => {
                console.log('error', error);
            });
    }

    // Subscribe to auth.onAuthStateChanged
    // Use users displayName, photoUrl
    // If user is logged in set current user to the user information
    // otherwise set it to null or {}??
    // User Model {name, avatar, email, provider, anything else}

    logout() {
        this.authService.logout();
    }
}