import { Action } from '@ngrx/store';

import { Product } from '../../product.model';

export enum ProductActionType {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail',
  LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success',
}

// Action Creators
export class LoadProductsAction implements Action {
  readonly type = ProductActionType.LOAD_PRODUCTS;
}

export class LoadProductsFailAction implements Action {
  readonly type = ProductActionType.LOAD_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductsSuccessAction implements Action {
  readonly type = ProductActionType.LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

// Action type
export type ProductsAction =
  LoadProductsAction |
  LoadProductsFailAction |
  LoadProductsSuccessAction;
