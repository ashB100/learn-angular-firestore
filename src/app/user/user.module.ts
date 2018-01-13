import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    SharedModule
  ],
})
export class UserModule {
  /*static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        AuthenticationService
      ]
    };
  } */
}

