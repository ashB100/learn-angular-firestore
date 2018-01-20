import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, filter, switchMap, take, tap } from "rxjs/operators";

import { ProductState } from "../reducers/products.reducer";
import * as fromStore from '../../store';
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private store: Store<ProductState>) {}
  
  canActivate() {
    return this.checkStore()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getProductsLoaded)
      .pipe(
        tap( (loaded: boolean) => {
          if (!loaded) {
            this.store.dispatch(new fromStore.LoadProductsAction())
          }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
      );
  }
}
