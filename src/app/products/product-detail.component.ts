import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from './product.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ProductDataService} from './product-data.service';

@Component({
    selector: 'product-detail',
    template: `
        <ng-container *ngIf="product$ | async as product; else noproduct">
            <h1>{{ product.name }}</h1>
            <p>{{ product.price }}</p>

            <button [routerLink]="['../']">Back</button>
            <button [routerLink]="['../', product.id, 'edit']">Edit</button>
        </ng-container>
        
        <ng-template #noproduct>
            <p>Product does not exist</p>
        </ng-template>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
    product$: Observable<Product | null>;
    
    constructor(private route: ActivatedRoute, private productService: ProductDataService) {
    }

    ngOnInit() {
        console.log('Detail Component', this.route);
        this.product$ = this.productService.getProductFromRoute(this.route);
    }
}