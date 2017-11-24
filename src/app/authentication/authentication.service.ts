import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
    constructor(public afAuth: AngularFireAuth) {}
    auth = this.afAuth.auth;

    login(provider:string) {
        let providerInstance = this.getProvider(provider);
        console.log('providerInstance', providerInstance);
        return this.auth.signInWithPopup(providerInstance);

    }

    getProvider(provider:string) {
        const auth = firebase.auth;
        const providers = {
            'twitter': new auth.TwitterAuthProvider(),
            'facebook': new auth.FacebookAuthProvider(),
            'github': new auth.GithubAuthProvider(),
            'google': new auth.GoogleAuthProvider()
        };

        return providers[provider];
    }

    fetchProvidersForEmail(email:string) {
        return this.afAuth.auth.fetchProvidersForEmail(email)
    }

    onAuthStateChanged() {
        return this.auth.onAuthStateChanged;
    }

    authState() {
        return this.afAuth.authState;
    }

    logout() {
        this.auth.signOut();
    }
}