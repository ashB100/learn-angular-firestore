import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import {ProductItemComponent, ProductListComponent} from './product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './product-data.service';
import { RouterModule } from '@angular/router';
import {ProductEditComponent} from "./product-edit.component";

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductListComponent, resolve: {items: ProductDataService } },
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
      ]),
    SharedModule
  ],
  providers: [
    ProductDataService
  ]
})
export class ProductModule {}
