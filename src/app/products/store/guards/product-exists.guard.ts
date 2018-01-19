import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../../store';
import { Product } from '../../product.model';

@Injectable()
export class ProductExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductState>) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore()
      .pipe(
      switchMap(() => {
        return this.hasProduct(route.params.productId);
      })
    );
  }

  // Here, we want to get a reference to our product entities
  hasProduct(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getProductEntities)
      .pipe(
        map((entities: {[key: string]: Product }) => {
          return !!entities[id];
        }),
        take(1)
      );
  }

  // The reason we have to do this is because of the way the
  // route guards are instantiated. They do not wait for
  // asynchronous actions to complete, they are called one
  // after the other
  // TODO: we can put this bit of code in a utility function and
  // import it into the guards
  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getProductsLoaded)
      .pipe(
      tap(loaded => {
        if (!loaded) {
          console.log('dispatch LoadProductsAction')
          this.store.dispatch(new fromStore.LoadProductsAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
