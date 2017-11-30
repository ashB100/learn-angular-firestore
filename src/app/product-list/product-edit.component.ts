import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductDataService} from "./product-data.service";

@Component({
  template: `
      <form #myForm="ngForm"
            (ngSubmit)="addProduct()">
          <label for="name">Name</label>
          <input type="text" [(ngModel)]="name"
                 name="name"
                 id="name">
          <label for="price">Price</label>
          <input type="number" [(ngModel)]="price"
                 name="price"
                 id="price">
          <button type="submit">Add Product</button>
      </form>
  `,
  
})
export class ProductEditComponent implements OnInit {
  name: string;
  price: number;
  productId: string | null;
  constructor(private route: ActivatedRoute, private dataService: ProductDataService) {}
  
  ngOnInit() {
    this.route.paramMap
        .map((params: ParamMap) => params.get('id') )
        .filter((productId: string | null) => !!productId)
        .switchMap((productId: string) => {
          this.productId = productId;
          return this.dataService.getProduct(productId);
        })
        .subscribe(product => {
          this.name = product.name;
          this.price = product.price;
          this.productId = product.id;
        });
    
  }
  
  // If id is '0', add product, otherwise edit existing product
  addProduct() {
    this.dataService.addProduct({
      name: this.name,
      price: this.price,
    });
  }
}