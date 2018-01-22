import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from "angularfire2/firestore";
import { MatSnackBarModule } from "@angular/material";
import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ProductDataService } from '../../services/product-data.service';
import * as fromEffects from './products.effects';
import * as fromActions from '../actions/products.action';
import { Product } from "../../models/product.model";
import { ProductsEffects } from "./products.effects";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }
  
  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

fdescribe('ProductsEffects', () => {
  let actions$: TestActions;
  let service: ProductDataService;
  let effects: ProductsEffects;
  
  const products: Product[] = [
    {
      id: "1",
      name: 'Product #1',
      price: 1,
    },
    {
      id: "2",
      name: 'Product #2',
      price: 2,
    },
  ];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      // Only modules go in imports ie classes with @NgModule() decorator
      // Once you import this module, whatever declarables (components, directives, pipes),
      // services, exports the module has are now part of your module.
      // MatSnackBar
      imports: [ MatSnackBarModule ],
      providers: [
        fromEffects.ProductsEffects,
        { provide: Actions, useFactory: getActions },
        // Have to provide the data service dependencies in testbed as well
        ProductDataService,
        { provide: AngularFirestore, useValue: {}},
      ],
    });
    
    actions$ = TestBed.get(Actions);
    // get instantiates the ProductDataService instance
    service = TestBed.get(ProductDataService);
    effects = TestBed.get(fromEffects.ProductsEffects);
    
    spyOn(service, 'getProducts').and.returnValue(of(products));
    spyOn(service, 'addProduct').and.returnValue(of(products[0]));
    spyOn(service, 'updateProduct').and.returnValue(of(products[0]));
    spyOn(service, 'deleteProduct').and.returnValue(of(products[0]));
  });
  
  describe('loadProduct$', () => {
    it('should word', () => {
      const action = new fromActions.LoadProductsAction();
      const completion = new fromActions.LoadProductsSuccessAction(products);
      
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      
      expect(effects.loadProduct$).toBeObservable(expected);
    });
  });
  
  describe('createProduct$', () => {
    it('should work', () => {
      const action = new fromActions.CreateProduct(products[0]);
      const completion = new fromActions.CreateProductSuccess(products[0]);
      
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      
      expect(effects.createProduct$).toBeObservable(expected);
    });
  });
  
  describe('updateProduct$', () => {
    it('should work', () => {
      const action = new fromActions.UpdateProduct(products[0]);
      const completion = new fromActions.UpdateProductSuccess(products[0]);
      
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      
      expect(effects.updateProduct$).toBeObservable(expected);
    });
  });
  
  describe('removeProduct$', () => {
    it('should work', () => {
      const action = new fromActions.RemoveProduct(products[0]);
      const completion = new fromActions.RemoveProductSuccess(products[0]);
      
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      
      expect(effects.removeProduct$).toBeObservable(expected);
    });
  });
});
