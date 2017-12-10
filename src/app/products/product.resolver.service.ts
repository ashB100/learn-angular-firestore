import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProductDataService} from './product-data.service';

@Injectable()
export class ProductResolver implements Resolve<any> {
  constructor(private router: Router, private productService: ProductDataService) {}
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

    return this.productService.getProducts()
      .take(1);

    // TODO: How do I handle errors here?
  }
}

