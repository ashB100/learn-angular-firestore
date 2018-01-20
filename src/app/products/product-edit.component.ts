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
import { filter, take, tap } from 'rxjs/operators';
import { Go } from '../store/actions/router.actions';

@Component({
  template: `
    <mat-card>
      <!--ng-container *ngIf="product$ | async as product;else notFound"-->
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
  
  constructor(private store: Store<ProductState>) {}
  
  ngOnInit() {
    this.productEditForm = new FormGroup({
      //id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
    });
    
    this.store.select(fromStore.getSelectedProduct)
      .pipe(
        filter(product => !!product),
        take(1)
      )
      .subscribe((product: Product) => {
        this.product = product;
        this.productEditForm.setValue({ name: product.name, price: product.price });
        // Doing this way will break if more properties got added in the
        // database collection without updating the FormGroup creation above!
        //this.productEditForm.setValue({ ...product });
      });
  }
  
  save(product: Product) {
    if (this.product) {
      this.store.dispatch(new fromStore.UpdateProduct({ ...product, id: this.product.id }));
    } else {
      this.store.dispatch(new fromStore.CreateProduct(product));
    }
  }
  
  cancel() {
    this.store.dispatch(new Go({
      path: ['/products']
    }));
  }
}

