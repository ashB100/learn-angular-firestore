import { TestBed } from "@angular/core/testing";
import { ROUTER_NAVIGATION, routerReducer } from "@ngrx/router-store";
import { StoreModule, Store } from '@ngrx/store';

import * as fromReducers from '../reducers/products.reducer';
import * as fromActions from '../actions';
import * as fromSelectors from './products.selectors';
import * as fromRoot from '../../../store';

import { Product } from '../../models/product.model';
import { reducer } from "../reducers/products.reducer";
import { tap } from "rxjs/operators";

fdescribe('Product Selectors', () => {
  // Set up mock data
  let store: Store<fromReducers.ProductState>;
  
  const product1: Product = {
    id: 'one',
    name: 'First',
    price: 1
  };
  
  const product2: Product = {
    id: 'two',
    name: 'Second',
    price: 2
  };
  
  const products: Product[] = [product1, product2];
  
  const entities = {
    one: products[0],
    two: products[1]
  };
  console.log('entities', entities);
  
  // Configure Testing Module
  // Import StoreModule, pass it state reducers
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          routerReducer: routerReducer,
          products: reducer,
        })
      ]
    });
    
    // Instantiate store
    store = TestBed.get(Store);
    console.log('store', store);
  });
  
  
  // getProductEntities
  describe('getProductEntities', () => {
    it('should return product entities', () => {
      let result;
      
      store
        .select(fromSelectors.getProductEntities)
        .subscribe(value => (result = value));
      
      expect(result).toEqual({});
      
      store.dispatch(new fromActions.LoadProductsSuccessAction(products));
      
      expect(result).toEqual(entities);
    });
  });
  
  // getSelectedProduct
  describe('getSelectedProduct', () => {
    it('should return selected product as an entity', () => {
      let result;
      let params;
      
      store.dispatch(new fromActions.LoadProductsSuccessAction(products));
      
      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: { productId: 'two' }
          },
          event: {}
        }
      });
      
      store
        .select(fromRoot.getRouterState)
        .pipe(
          tap(routerState => console.log('routerState', routerState.state.params))
        )
        .subscribe(routerState => (params = routerState.state.params));
      
      expect(params).toEqual({ productId: 'two' });
      
      // Todo: maybe to do with authentication guard
      /*store
        .select(fromSelectors.getSelectedProduct)
        .pipe(
          tap(selectedProduct => console.log('selectedProduct', selectedProduct))
        )
        .subscribe(selectedProduct => (result = selectedProduct)); */

      //expect(result).toEqual(entities[1]);
    });
  });
  
  // getAllProducts
  
  // getProductsLoaded
  
});
