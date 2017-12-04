import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Product } from "./product.model";
import { ProductDataService } from "./product-data.service";

@Component({
  template: `
      <mat-card>
          <ng-container *ngIf="product; else productNotFound">
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
                  <button (click)="save(productEditForm.value)" type="submit" mat-button>Save</button>
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
  productEditForm: FormGroup;
  
  //product$: Observable<Product | null>;
  product: Product;
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
      this.product = new Product();
      this.createFormControlGroup(this.product);
    }
    else {
      this.productService.getProduct(this.params.id)
          .subscribe((product: Product) => {
            this.product = product;
            this.createFormControlGroup(this.product);
          })
    }
  }
  
  createFormControlGroup(product: Product) {
    this.productEditForm = new FormGroup({
      name: new FormControl(product.name),
      price: new FormControl(product.price),
    });
    
    //this.productEditForm.setValue(product);
  }
  // edit calls service to update database
  save(product: Product) {
    if(this.params.isNewProduct) {
      this.productService.addProduct(product)
          .then(product => {
            // TODO: display message on snackbar
            console.log('product created', product);
          })
    }
    else {
      this.productService.updateProduct({product: product, id: this.params.id })
          .then(() => {
            // TODO: display message on snackbar
            console.log('product updated')
          })
    }
    //this.productService.updateProduct({product: product, id: this.params.id });
  }
  
  cancel() {
    this.router.navigate(['/products']);
  }
}

