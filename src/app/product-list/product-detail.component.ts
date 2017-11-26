import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductDataResolver } from './product-list-data-resolver';
import { ProductDataService } from './product-data.service';

@Component({
    selector: 'product-detail',
    template: `
        <h1>{{ (product$ | async)?.name }}</h1>
        <p>{{ (product$ | async)?.price }}</p>
    `
})
export class ProductDetailComponent implements OnInit {
    product$: Observable<Product>;

    constructor(private route: ActivatedRoute, private productService: ProductDataService ) {}

    ngOnInit() {
        this.product$ = this.route.paramMap
        .switchMap((params: ParamMap) => {
            return this.productService.getProduct(params.get('id'));
        });
    }
}