import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './product-data.service';
import { RouterModule } from '@angular/router';
import {ProductEditComponent} from "./product-edit.component";

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, resolve: {items: ProductDataService } },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent }
      ]),
    SharedModule
  ],
  providers: [
    ProductDataService
  ]
})
export class ProductModule {}
