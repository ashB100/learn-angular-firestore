import { Action } from '@ngrx/store';

import { Product } from '../../product.model';

// Load Document
export enum ProductActionType {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail',
  LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success',
  CREATE_PRODUCTS = '[Products] Create Products',
  CREATE_PRODUCTS_SUCCESS = '[Products] Create Products Success',
  CREATE_PRODUCTS_FAIL = '[Products] Create Products Fail',
  UPDATE_PRODUCTS = '[Products] Update Products',
  UPDATE_PRODUCTS_SUCCESS = '[Products] Update Products Success',
  UPDATE_PRODUCTS_FAIL = '[Products] Update Products Fail',
  REMOVE_PRODUCTS = '[Products] Remove Products',
  REMOVE_PRODUCTS_SUCCESS = '[Products] Remove Products Success',
  REMOVE_PRODUCTS_FAIL = '[Products] Remove Products Fail',
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

// Create Document
// Action Creators
export class CreateProduct implements Action {
  readonly type = ProductActionType.CREATE_PRODUCTS;
  constructor(public payload: Product) {}
}

export class CreateProductSuccess implements Action {
  readonly type = ProductActionType.CREATE_PRODUCTS_SUCCESS;
  constructor(public payload: Product) {}
}

export class CreateProductFail implements Action {
  readonly type = ProductActionType.CREATE_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

// Update Document
// Action Creators
export class UpdateProduct implements Action {
  readonly type = ProductActionType.UPDATE_PRODUCTS;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionType.UPDATE_PRODUCTS_SUCCESS;
  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionType.UPDATE_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

// Remove Document
// Action Creators
export class RemoveProduct implements Action {
  readonly type = ProductActionType.REMOVE_PRODUCTS;
  constructor(public payload: Product) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = ProductActionType.REMOVE_PRODUCTS_SUCCESS;
  constructor(public payload: Product) {}
}

export class RemoveProductFail implements Action {
  readonly type = ProductActionType.REMOVE_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

// Action type
export type ProductsAction =
  LoadProductsAction |
  LoadProductsFailAction |
  LoadProductsSuccessAction |
  UpdateProduct |
  UpdateProductSuccess |
  UpdateProductFail |
  CreateProduct |
  CreateProductSuccess |
  CreateProductFail |
  RemoveProduct |
  RemoveProductSuccess |
  RemoveProductFail;
