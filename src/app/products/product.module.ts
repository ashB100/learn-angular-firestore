import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductItemComponent, ProductListComponent } from './product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './product-data.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
import { ProductResolver } from './product.resolver.service';
import { ProductGuard } from './product.guard.service';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { effects } from './store';
import { reducer, PRODUCT_FEATURE_STORE_NAME } from './store/reducers/products.reducer';

export const ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {items: ProductResolver},
    canActivate: [ProductGuard]
  },
  { path: 'new', component: ProductEditComponent, canActivate: [ProductGuard] },
  { path: ':id', component: ProductDetailComponent, canActivate: [ProductGuard] },
  { path: ':id/edit', component: ProductEditComponent, canActivate: [ProductGuard] }
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(PRODUCT_FEATURE_STORE_NAME, reducer),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: [
    ProductResolver,
    ProductDataService,
    ProductGuard
  ]
})
export class ProductModule {
}
