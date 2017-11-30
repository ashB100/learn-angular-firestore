import {Component, OnInit} from '@angular/core';
import {Product} from './product.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ProductDataService} from './product-data.service';

@Component({
    selector: 'product-detail',
    template: `
        <h1>{{ (product$ | async)?.name }}</h1>
        <p>{{ (product$ | async)?.price }}</p>
        
        <button [routerLink]="['products']">Back</button>
        <button [routerLink]="[productId, 'edit']">Edit</button>
    `
})
export class ProductDetailComponent implements OnInit {
    // TODO: Should product$ be a subject ??
    product$: Observable<Product | undefined>;
    productId: string;
    
    constructor(private route: ActivatedRoute, private productService: ProductDataService) {
    }

    ngOnInit() {
        this.product$ = this.route.paramMap
            .map((params: ParamMap) => params.get('id') )
            .filter((productId: string | null) => !!productId)
            .switchMap((productId: string) => {
                this.productId = productId;
                return this.productService.getProduct(productId);
            });
    }
}