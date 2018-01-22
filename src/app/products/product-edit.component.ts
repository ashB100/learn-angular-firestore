import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Product } from './models/product.model';
import { ProductState } from './store/reducers/products.reducer';
import * as fromStore from './store';
import { filter, take } from 'rxjs/operators';
import { Go } from '../store/actions/router.actions';

@Component({
  template: `
    <mat-card>
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
  
  constructor(private store: Store<ProductState>, private router: Router) {
  }
  
  ngOnInit() {
    this.productEditForm = new FormGroup({
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
        this.productEditForm.setValue({name: product.name, price: product.price});
      });
  }
  
  save(product: Product) {
    if (this.product) {
      this.store.dispatch(new fromStore.UpdateProduct({...product, id: this.product.id}));
    } else {
      this.store.dispatch(new fromStore.CreateProduct(product));
    }
  }
  
  cancel() {
    /*this.store.dispatch(new Go({
      path: ['/products']
    })); */
    this.router.navigate(['/products']);
  }
}

