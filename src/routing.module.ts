import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'login', loadChildren: 'app/user/user.module#UserModule' },
    { path: 'products', loadChildren: 'app/products/product.module#ProductModule'},
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    //{ path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
