import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromProducts from '../reducers/products.reducer';
import * as fromRoot from '../../../store';

import { ProductState } from '../reducers/products.reducer';
import { Product } from '../../models/product.model';

/*export const getProductState = createSelector(
  fromProducts.getProductState,
  (state: fromProducts.ProductState) => state.entities
); */

export const getProductEntities: MemoizedSelector<ProductState, { [id: string]: Product }> = createSelector(
  fromProducts.getProductState,
  (state: fromProducts.ProductState) => state.entities
);

export const getSelectedProduct = createSelector(
  getProductEntities,
  fromRoot.getRouterState,
  (entities, router): Product => {
    return router.state && entities[router.state.params.productId];
  }
);

export const getAllProducts: MemoizedSelector<ProductState, Product[]> = createSelector(
  getProductEntities,
  (entities) => {
    return Object.values(entities);
  }
);

export const getProductsLoaded = createSelector(
  fromProducts.getProductState,
  (state: fromProducts.ProductState) => state.loaded
);
