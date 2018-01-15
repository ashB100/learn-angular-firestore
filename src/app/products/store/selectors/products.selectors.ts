import { createSelector, MemoizedSelector } from "@ngrx/store";
import * as fromProducts from '../reducers/products.reducer';
import { ProductState } from "../reducers/products.reducer";
import { Product } from "../../product.model";

export const getProductEntities: MemoizedSelector<ProductState, { [id:string]: Product }> = createSelector(
  fromProducts.getProductState,
  (state: fromProducts.ProductState) => state.entities
);

// TODO: once router-store is in place
// export const getSelectedProduct = createSelector()

export const getAllProducts: MemoizedSelector<ProductState, Product[]> = createSelector(
  getProductEntities,
  (entities) => {
    return Object.values(entities);
  }
);
