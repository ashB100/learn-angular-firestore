import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Not used in production:
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers, RouterEffects, CustomSerializer } from './store';
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

import { NavigationComponent } from './nav/nav.component';
import { AuthenticationService } from './user/authentication.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    NavigationComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FlexLayoutModule,
    AppRoutingModule,
    StoreRouterConnectingModule,
    EffectsModule.forRoot([RouterEffects]),
    StoreModule.forRoot(reducers),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 50
    }),
    SharedModule,
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
