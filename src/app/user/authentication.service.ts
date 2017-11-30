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
  Twitter,
  Google,
}

@Injectable()
export class AuthenticationService {
  currentUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    afAuth.auth.onAuthStateChanged(user => {
      console.log('onAuthStateChanged', user);
      this.currentUser = user;
    });
  }

  login(provider: SupportedProvider) {
    const observable = Observable.create( (observer: Observer<any>) => {
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

    return observable;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getProvider(provider: SupportedProvider): auth.AuthProvider {
    const providers = {
      [SupportedProvider.Twitter]: auth.TwitterAuthProvider,
      // facebook: new auth.FacebookAuthProvider(),
      // github: new auth.GithubAuthProvider(),
      [SupportedProvider.Google]: auth.GoogleAuthProvider,
    };

    console.log('provider', provider);
    const providerClass: any = providers[SupportedProvider[provider]];

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
