import {NgModule} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    MaterialModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class UserModule {
}
