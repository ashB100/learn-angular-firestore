import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { Product } from './product.model';
import { ProductDataService } from './product-data.service';
import { ProductState } from './store/reducers/products.reducer';
import * as fromStore from './store';
import { tap } from 'rxjs/operators';
import { Go } from '../store/actions/router.actions';

@Component({
  template: `
    <mat-card>
      <!--ng-container product$ | async-->
      <!--mat-card-header [ngSwitch]="params?.productId">
          <mat-card-title *ngSwitchCase="true">Create New Product</mat-card-title>
          <mat-card-title *ngSwitchCase="false">Edit Product</mat-card-title>
          <mat-card-subtitle *ngSwitchCase="false">{{product.name}} price: {{product.price}}</mat-card-subtitle>
      </mat-card-header-->
      <mat-card-content>
        <form [formGroup]="productEditForm">

          <mat-form-field class="full-width">
            <input formControlName="name" matInput placeholder="Product Name">
          </mat-form-field>

          <mat-form-field class="full-width">
            <input type="number" formControlName="price" matInput placeholder="Price">
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="save(productEditForm.value)" type="submit" mat-raised-button color="primary">Save</button>
        <button (click)="cancel()" mat-raised-button color="accent">Cancel</button>
      </mat-card-actions>

      <!--/ng-container-->

      <ng-template #productNotFound>
        <mat-card-header>Product {{params.id}} not found.</mat-card-header>
      </ng-template>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class ProductEditComponent implements OnInit {
  productEditForm: FormGroup;
  product: Product;
  params: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductDataService,
              private store: Store<ProductState>) {
  }

  ngOnInit() {
    this.productEditForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
    });

    this.store.select(fromStore.getSelectedProduct)
      .pipe(
        tap((product: Product | undefined) => {
          console.log('jkhkproduct', product)
          if (!!(product)) {
            this.productEditForm.setValue({ name: product.name });
            this.productEditForm.setValue({ price: product.price });
          }
        })
      );
  }

  createFormControlGroup(product: Product) {
    this.productEditForm = new FormGroup({
      name: new FormControl(product.name),
      price: new FormControl(product.price),
    });
  }
  save(product: Product) {
    if (this.params.isNewProduct) {
      this.store.dispatch(new fromStore.CreateProduct(product));
    } else {
      this.store.dispatch(new fromStore.UpdateProduct({ ...product, id: this.params.id }));
    }
  }

  cancel() {
    // TODO: use store.dispatch go
    //this.router.navigate(['/products']);
    this.store.dispatch(new Go({
      path: ['/products']
    }));
  }
}

