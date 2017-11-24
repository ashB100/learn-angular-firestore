import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/authentication/login.component';
import { ProductList } from './app/product-list/product-list.component';
import { ProductDataResolver } from './app/product-list/product-list-data-resolver';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductList, resolve: {items: ProductDataResolver} },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
