import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDataService } from './product-data.service';
import { Product } from './product.model';


@Component({
  selector: 'app-root',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductListComponent implements OnInit {
  name: string;
  price: number;
  products: Product[];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: ProductDataService) {}
  ngOnInit() {
      console.log('did productlist ngoninit run?')
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