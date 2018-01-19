import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from './product.model';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductListComponent implements OnInit {
  //products: Product[] = [];
  products$: Observable<Product[]>
  constructor(
      private route: ActivatedRoute,
      private store: Store<fromStore.ProductState>
  ) {}
  ngOnInit() {
    //console.log('product list, data in snapshot', this.route.snapshot);
    //this.products = this.route.snapshot.data['items'];
    this.products$ = this.store.select(fromStore.getAllProducts);
  }
  /*deleteProduct(documentId: string) {
    console.log('deleting ', documentId);
    this.dataService.deleteProduct(documentId)
        .then(() => {
          // TODO: write update to snackbar
          console.log('Should route to /products now?!')
          this.router.navigate(['/products']);
        });
  } */
  onRemove(event: Product) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveProduct(event));
    }
  }
}
