import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProductDataService} from './product-data.service';
// import { ProductsState } from "./store/reducers/index";
import { Store } from "@ngrx/store";
import { LoadProductsAction } from "./store/actions/products.action";
import { getAllProducts } from "./store/selectors/products.selectors";
import { switchMap } from "rxjs/operator/switchMap";
import { ProductState } from "./store/reducers/products.reducer";
import { of } from "rxjs/observable/of";
import { take } from "rxjs/operators";
import { Product } from "./product.model";

@Injectable()
export class ProductResolver implements Resolve<any> {
  
  constructor(
    private store: Store<ProductState>,
    private productService: ProductDataService) {}
    
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.select(getAllProducts)
      .switchMap((products: Product[]) => {
        if (products && products.length) {
          return of(products);
        } else {
          this.store.dispatch(new LoadProductsAction());
          return this.store.select(getAllProducts).skip(1);
        }
      })
      .take(1);
  }
}
