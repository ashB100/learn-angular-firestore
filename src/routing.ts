import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/authentication/login.component';
import { ProductList } from './app/product-list/product-list.component';
import { ProductDetailComponent } from './app/product-list/product-detail.component';
import { ProductDataResolver } from './app/product-list/product-list-data-resolver';
import { ProductDataService } from './app/product-list/product-data.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductList, resolve: {items: ProductDataService } },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
