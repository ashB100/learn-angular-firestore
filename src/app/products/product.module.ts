import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import {ProductItemComponent, ProductListComponent} from './product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './product-data.service';
import { RouterModule } from '@angular/router';
import {ProductEditComponent} from './product-edit.component';
import {ProductResolver} from './product.resolver.service';
import {ProductGuard} from './product.guard.service';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
        resolve: { items: ProductResolver },
        canActivate: [ProductGuard]
      },
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
      ]),
    SharedModule
  ],
  providers: [
    ProductResolver,
    ProductDataService,
    ProductGuard
  ]
})
export class ProductModule {}
