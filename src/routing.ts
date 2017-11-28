import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/user/login.component';
import { ProductListComponent } from './app/product-list/product-list.component';
import { ProductDetailComponent } from './app/product-list/product-detail.component';
import { ProductDataService } from './app/product-list/product-data.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListComponent, resolve: {items: ProductDataService } },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
