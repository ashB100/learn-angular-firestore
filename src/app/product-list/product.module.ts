import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './product-data.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, resolve: {items: ProductDataService } },
      { path: 'products/:id', component: ProductDetailComponent }
      ]),
    SharedModule
  ],
  providers: [
    ProductDataService
  ]
})
export class ProductModule {}
