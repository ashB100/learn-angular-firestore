import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthCredential = firebase.auth.AuthCredential;
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    user$: Observable<firebase.User>;
    currentUser: firebase.User|null = null;

    constructor(private afAuth: AngularFireAuth) {}
    
    login(provider:string) {
        let providerInstance = this.getProvider(provider);
        this.afAuth.auth.signInWithPopup(providerInstance)
            .then(credentials => {
                this.currentUser = credentials.user;
                return this.afAuth.authState;
            },
            err => {
                // Show error message using Angular Material
            })
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getProvider(provider: string): AuthCredential {
        const auth = firebase.auth;
        const providers = {
            twitter : new auth.TwitterAuthProvider(),
            facebook: new auth.FacebookAuthProvider(),
            github: new auth.GithubAuthProvider(),
            google: new auth.GoogleAuthProvider()
        };

        return providers[provider];
    }

    fetchProvidersForEmail(email: string) {
        return this.afAuth.auth.fetchProvidersForEmail(email);
    }

    onAuthStateChanged() {
        return this.afAuth.auth.onAuthStateChanged;
    }

    authState() {
        return this.afAuth.authState;
    }

    logout() {
        return this.afAuth.auth.signOut();
    }
}