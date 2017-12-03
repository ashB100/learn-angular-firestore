import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from '../routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavigationComponent } from './nav/nav.component';
import { AuthenticationService } from './user/authentication.service';
import { SharedModule } from './shared/shared.module';

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
    //ProductModule,
    //UserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
