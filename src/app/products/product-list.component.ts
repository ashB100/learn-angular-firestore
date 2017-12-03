import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductDataService } from './product-data.service';
import { Product } from './product.model';

@Component({
  selector: 'product-item',
  template: `
    <span [routerLink]="[product.id]">{{ product.name }} {{ product.price }}</span>
    <button [routerLink]="[product.id, 'edit']">Edit</button>
    
    <button (click)="editClick.next(product.id)">Delete</button>
  `,
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() editClick = new EventEmitter();
  
  
}

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductListComponent implements OnInit {
  name: string;
  price: number;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: ProductDataService) {
      console.log("ProductListComponent constructor", route);
  }
  
  ngOnInit() {
    this.products = this.route.snapshot.data['items'];
  }

  addProduct() {
    this.dataService.addProduct({
        name: this.name,
        price: this.price,
    })
    .then(() => {
        this.dataService.getProducts()
            .subscribe(products => {
                this.products = products;
            });
    });
  }

  deleteProduct(documentId: string) {
    this.dataService.deleteProduct(documentId)
        .then(() => this.router.navigate(['/products']))
  }
}