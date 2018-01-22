import * as productActions from './products.action';
import { Product } from "../../models/product.model";

describe('Product Actions', () => {
  
  describe('LoadProducts Actions', () => {
    describe('LoadProducts', () => {
      it('should create an action', () => {
        const action = new productActions.LoadProductsAction();
        
        expect({...action}).toEqual({
          type: productActions.ProductActionType.LOAD_PRODUCTS
        });
      });
    });
    
    describe('LoadProductsFail', () => {
      it('should create an action', () => {
        const payload = {message: 'Load Error'};
        const action = new productActions.LoadProductsFailAction(payload);
        
        expect({...action}).toEqual({
          type: productActions.ProductActionType.LOAD_PRODUCTS_FAIL,
          payload: payload
        });
      });
    });
    
    describe('LoadProductsSuccess', () => {
      it('should create an action', () => {
        const payload: Product[] = [
          {
            id: 'one',
            name: 'First',
            price: 1
          },
          {
            id: 'two',
            name: 'Second',
            price: 2
          },
          {
            id: 'three',
            name: 'Third',
            price: 3
          },
        ];
        
        const action = new productActions.LoadProductsSuccessAction(payload);
        
        const type = productActions.ProductActionType.LOAD_PRODUCTS_SUCCESS;
        
        expect({ ...action }).toEqual({
          type,
          payload
        });
      });
    });
  });
  
  
  describe('RemoveProducts Actions', () => {
    describe('RemoveProducts', () => {
      it('should create an action', () => {
        const payload: Product = {
          id: 'one',
          name: 'First',
          price: 1
        };
        
        const action = new productActions.RemoveProduct(payload);
        
        expect({...action}).toEqual({
          type: productActions.ProductActionType.REMOVE_PRODUCTS,
          payload
        });
      });
    });
    
    describe('RemoveProductsFail', () => {
      it('should create an action', () => {
        const payload = {message: 'Load Error'};
        const action = new productActions.RemoveProductFail(payload);
        
        expect({...action}).toEqual({
          type: productActions.ProductActionType.REMOVE_PRODUCTS_FAIL,
          payload: payload
        });
      });
    });
    
    describe('RemoveProductsSuccess', () => {
      it('should create an action', () => {
        const payload: Product = {
            id: 'one',
            name: 'First',
            price: 1
          };
        
        const action = new productActions.RemoveProductSuccess(payload);
        
        const type = productActions.ProductActionType.REMOVE_PRODUCTS_SUCCESS;
        
        expect({ ...action }).toEqual({
          type,
          payload
        });
      });
    });
  });
  
})

