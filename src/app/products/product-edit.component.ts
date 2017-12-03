import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductDataService} from "./product-data.service";
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "./product.model";

@Component({
  template: `
      <ng-container *ngIf="product$ | async as product; else productNotFound">
          <h1>Editing {{product.name}} {{product.price}}</h1>
          <form [formGroup]="productEditForm"
                (ngSubmit)="editProduct(productEditForm.value)">

              <mat-form-field class="full-width">
                  <input formControlName="name" [value]="product.name"  matInput placeholder="Product Name">
              </mat-form-field>

              <mat-form-field class="full-width">
                  <input formControlName="price" [value]="product.price" matInput placeholder="Price">
              </mat-form-field>
          </form>

      </ng-container>
      
      <ng-template #productNotFound>
          <p>Product not found.</p>
      </ng-template>
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
  
  isNew: boolean = true;

  constructor(private route: ActivatedRoute, private productService: ProductDataService) {
  }
  
  ngOnInit() {
    this.route.paramMap.map((params: ParamMap) => this.isNew = !params.get('id'));
    this.product$ = this.productService.getProductFromRoute(this.route)
        .map(product => {
          return product || this.isNew ? new Product() : null
        });
  }
  
  private createForm(product: Product) {
    this.productEditForm = new FormGroup({
      name: new FormControl(product.name),
      price: new FormControl(product.price),
    });
  }
  
  // edit calls service to update database
  editProduct(product: Product) {
    console.log('ProductEditComponent#editProduct', product);
  }
}

