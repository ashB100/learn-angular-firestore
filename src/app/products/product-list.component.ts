import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from './models/product.model';
import { Store } from '@ngrx/store';
import * as fromStore from './store';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  
  constructor(private store: Store<fromStore.ProductState>) {
  }
  
  ngOnInit() {
    this.products$ = this.store.select(fromStore.getAllProducts);
  }
  
  onRemove(product: Product) {
    const remove = window.confirm('Are you sure?');
    
    if (remove) {
      this.store.dispatch(new fromStore.RemoveProduct(product));
    }
  }
}
