import { BrowserModule } from '@angular/platform-browser';
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
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import {ProductModule} from './product-list/product.module';

@NgModule({
  declarations: [
    NavigationComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FlexLayoutModule,
    ProductModule,
    UserModule,
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
