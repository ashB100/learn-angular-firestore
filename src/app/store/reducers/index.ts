import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

// Custom Serializer
export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {

  // serialize gets given routerState of type RouterStateSnapshot
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    // We need to compose a new object based on the properties of the router
    // You can add more properties to RouterStateUrl interface.

    // use destructuring
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;

    // Because the router is a state tree, we can iterate a state tree
    // This is not the state tree to do with ngrx, this is the state
    // tree of Angular Router (of type ActivatedRouteSnapshot)
    // While we have a firstChild, it means we have child routes,
    // so we have to iterate a few times to get the route param
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;
    // is the same as: const params  = state.params

    // This is the object that is going to be bound to our state tree.
    // The ngrx/router-store will actually listen to angulars routing events.
    // Anytime you navigate somewhere, or Angular navigates somewhere, or something
    // changes in the url, this whole funciton is going to be called, which means
    // that we get the new state representation of where we are in the application
    // at all times.
    return { url, queryParams, params };
  }
}
