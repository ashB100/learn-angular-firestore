import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

// type SupportedProvider = 'twitter' | 'facebook';

// export const SupportedProviders: { [k: SupportedProvider]: auth.AuthProvider } = {};
export enum SupportedProvider {
  Twitter = 'Twitter',
  Google = 'Google',
}


@Injectable()
export class AuthenticationService {
  currentUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  login(provider: SupportedProvider) {
    return Observable.create( (observer: Observer<any>) => {
      this.afAuth.auth.signInWithPopup(this.getProvider(provider))
        .then(user => {
            this.currentUser = user;
            observer.next(user);
            observer.complete();
          },
          err => {
            observer.error(err);
          });
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getProvider(provider: SupportedProvider): auth.AuthProvider {
    // TS complains about `typeof auth.AuthProvider`, so we use any
    const providers: { [key: string]: any } = {
      [SupportedProvider.Twitter]: auth.TwitterAuthProvider,
      // facebook: new auth.FacebookAuthProvider(),
      // github: new auth.GithubAuthProvider(),
      [SupportedProvider.Google]: auth.GoogleAuthProvider,
    };

    const providerClass: any = providers[provider];
    return new providerClass();
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

  //Todo: return an observable and navigate to login in login component
  logout() {
      this.afAuth.auth.signOut()
        .then(() => this.router.navigateByUrl('/login'));
  }

  isAuthenticated() {
    return this.currentUser;
  }
}
