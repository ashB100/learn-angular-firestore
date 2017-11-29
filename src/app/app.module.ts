import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from '../routing';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductDetailComponent } from './product-list/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavigationComponent } from './nav/nav.component';
import { AuthenticationService } from './user/authentication.service';
import { ProductDataService } from './product-list/product-data.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    NavigationComponent,
    AppComponent,
  ],
    entryComponents: [
        ProductListComponent,
        ProductDetailComponent
    ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    UserModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    ProductDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
