import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as fromActions from '../actions/products.action';
import { ProductDataService } from '../../product-data.service';
import { MatSnackBar } from '@angular/material';
import * as fromRoot from '../../../store';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private dataService: ProductDataService,
              private snackBar: MatSnackBar) {
  }

  @Effect()
  loadProduct$ = this.actions$
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
  @Effect()
  createProduct$ = this.actions$
    .ofType(fromActions.ProductActionType.CREATE_PRODUCTS)
    .pipe(
      // map it so we just return the payload which contains the pizza
      map((action: fromActions.CreateProduct) => action.payload),
      switchMap(product => {
        return this.dataService
          .addProduct(product) // Angular's http returns an observable so we can pipe it
          .pipe(
            map(() => new fromActions.CreateProductSuccess(product)),
            catchError(error => of(new fromActions.CreateProductFail(error)))
          );
      })
    );

  @Effect()
  createProductSuccess$ = this.actions$
    .ofType(fromActions.ProductActionType.CREATE_PRODUCTS_SUCCESS)
    .pipe(
      map((action: fromActions.CreateProductSuccess) => action.payload),
      map(product => {
        return new fromRoot.Go({
          path: ['/products'],
        });
      })
    );

  @Effect()
  updateProduct$ = this.actions$
    .ofType(fromActions.ProductActionType.UPDATE_PRODUCTS)
    .pipe(
      map((action: fromActions.UpdateProduct) => action.payload),
      switchMap(product => {
        console.log('updateProduct$ product:', product);
        return this.dataService
          .updateProduct(product)
          .pipe(
            map(() => new fromActions.UpdateProductSuccess(product)),
            // Remember to use of to return an observable for catchError
            catchError(error => of(new fromActions.UpdateProductFail(error)))
          );
      })
    );

  @Effect()
  removeProduct$ = this.actions$
    .ofType(fromActions.ProductActionType.REMOVE_PRODUCTS)
    .pipe(
      map((action: fromActions.RemoveProduct) => action.payload),
      switchMap(product => {
        return this.dataService
          .deleteProduct(product.id)
          .pipe(
            map(() => new fromActions.RemoveProductSuccess(product)),
            catchError(error => of(new fromActions.RemoveProductFail(error)))
          );
      })
    );

  // TODO: how do I pass down action type to pass to snackbar?
  @Effect()
  handleProductSuccess$ = this.actions$
    .ofType(
      fromActions.ProductActionType.UPDATE_PRODUCTS_SUCCESS,
      fromActions.ProductActionType.REMOVE_PRODUCTS_SUCCESS
    )
    .pipe(
      tap( () => {
        this.openSnackBar('Product added/deleted', 'successfully');
      }),
      delay(1000),
      map(() => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    );

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
