import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Product } from "./product.model";
import { ProductDataService } from "./product-data.service";

@Component({
  template: `
      <mat-card>
          <ng-container *ngIf="product$ | async as product; else productNotFound">
              <mat-card-header [ngSwitch]="params?.isNewProduct">
                  <mat-card-title *ngSwitchCase="true">Create New Product</mat-card-title>
                  <mat-card-title *ngSwitchCase="false">Edit Product</mat-card-title>
                  <mat-card-subtitle *ngSwitchCase="false">{{product.name}} price: {{product.price}}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                  <form [formGroup]="productEditForm">

                      <mat-form-field class="full-width">
                          <input formControlName="name" matInput placeholder="Product Name">
                      </mat-form-field>

                      <mat-form-field class="full-width">
                          <input formControlName="price" matInput placeholder="Price">
                      </mat-form-field>
                  </form>
              </mat-card-content>
              <mat-card-actions>
                  <button (click)="updateProduct(productEditForm)" type="submit" mat-button>Save</button>
                  <button (click)="cancel()" mat-button>Cancel</button>
              </mat-card-actions>

          </ng-container>

          <ng-template #productNotFound>
              <mat-card-header>Product {{params.id}} not found.</mat-card-header>
          </ng-template>
      </mat-card>
  `,
  styles: [`
      .full-width {
          width: 100%;
      }
  `]
})
export class ProductEditComponent implements OnInit {
  productEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
  });
  
  product$: Observable<Product | null>;
  params: any;
  
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductDataService,
  ) {}
  
  ngOnInit() {
    this.route.paramMap
        .map((params: ParamMap) => {
          return {
            isNewProduct: !params.has('id'),
            id: params.get('id')
          };
        }).subscribe(routeParams => this.params = routeParams);
    
    if (this.params.isNewProduct) {
      this.product$ = Observable.of(new Product());
    }
    else {
      this.product$ = this.productService.getProduct(this.params.id);
      
    }
  }
  
  // edit calls service to update database
  updateProduct(product?: Product) {
    console.log('Update Product', product);
    this.productService.updateProduct(product);
  }
  
  cancel() {
    this.router.navigate(['/products']);
  }
}

