import { ProductActionType, ProductsAction  } from '../actions/products.action';
import { Product } from '../../models/product.model';
import { createFeatureSelector, MemoizedSelector } from "@ngrx/store";

export interface ProductState {
  entities: { [id: string]: Product };
  loading: boolean;
  loaded: boolean;
}

export const initialState: ProductState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: ProductsAction): ProductState {
  switch (action.type) {
    case ProductActionType.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionType.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;
      const entities = products
        .reduce((entities: { [id: string]: Product }, product: Product) => {
          return {
            ...entities,
            [product.id]: product
          };
        }, {
          ...state.entities
        });
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    // in this case, just return state
    case ProductActionType.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case ProductActionType.CREATE_PRODUCTS_SUCCESS:
    case ProductActionType.UPDATE_PRODUCTS_SUCCESS: {
      const product = action.payload;
      const entities = {
        ...state.entities,
        [product.id]: product
      };
      return {
        ...state,
        entities
      };
    }
    case ProductActionType.REMOVE_PRODUCTS_SUCCESS: {
      const product = action.payload;
      const {
        [product.id]: removed,
        ...entities
      } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const PRODUCT_FEATURE_STORE_NAME = 'products';
export const getProductState: MemoizedSelector<object, ProductState> = createFeatureSelector(PRODUCT_FEATURE_STORE_NAME);
export const getEntities = (state: ProductState) => state.entities;
export const getLoading = (state: ProductState) => state.loading;
export const getLoaded = (state: ProductState) => state.loaded;



