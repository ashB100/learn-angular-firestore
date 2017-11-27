import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

// type SupportedProvider = 'twitter' | 'facebook';

// export const SupportedProviders: { [k: SupportedProvider]: auth.AuthProvider } = {};
export enum SupportedProvider {
  Twitter,
  Google,
}


@Injectable()
export class AuthenticationService {
  //user$: Observable<firebase.User>;
  currentUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  login(provider: SupportedProvider) {
    let providerInstance = this.getProvider(provider);
    return this.afAuth.auth.signInWithPopup(providerInstance);
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

    const providerClass = providers[provider];
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

  logout() {
    return this.afAuth.auth.signOut();
  }
}