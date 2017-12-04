import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductDataService } from './product-data.service';
import { Product } from './product.model';

@Component({
  selector: 'product-item',
  template: `
      <mat-list-item>
        <h3 matLine>{{ product.name }}</h3>
        <button mat-mini-fab color="accent"><mat-icon>edit</mat-icon></button>
        &nbsp;
        <button mat-mini-fab color="warn"><mat-icon>delete_forever</mat-icon></button>
      </mat-list-item>
      
      <!--<span [routerLink]="[product.id]">{{ product.name }} {{ product.price }}</span>-->
      <!--<button [routerLink]="[product.id, 'edit']">Edit</button>-->
      <!--<button (click)="editClick.next(product.id)">Delete</button>-->
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
  products: Product[] = [];
  
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private dataService: ProductDataService
  ) {}
  
  ngOnInit() {
    this.products = this.route.snapshot.data['items'];
  }
  
  deleteProduct(documentId: string) {
    this.dataService.deleteProduct(documentId)
        .then(() => {
          // TODO: write update to snackbar
          this.router.navigate(['/products']);
        })
  }
}