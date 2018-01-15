/*import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as productActions from '../actions/products.action';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private  action$: Actions,
    private productService: ProductService) {
  }
  
  @Effect()
  loadProduct$ = this.action$.ofType(productActions.LOAD_PRODUCTS)
    .pipe(
      switchMap(() => {
        return this.productService.getPizzas().pipe(
          map(products => new productActions.LoadProductsSuccess(products)),
          catchError(error => of(new productActions.LoadProductsFail(error)))
        );
      })
    );
}*/
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as fromActions from '../actions/products.action';
import { ProductDataService } from '../../product-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private dataService: ProductDataService) {}
  
  @Effect() loadProduct$ = this.actions$
    .ofType(fromActions.ProductActionType.LOAD_PRODUCTS)
    .pipe(
      switchMap(() => {
        return this.dataService.getProducts()
          .pipe(
            map(products => new fromActions.LoadProductsSuccessAction(products)),
            catchError(error => of(new fromActions.LoadProductsFailAction(error)))
          );
      })
    );
}
