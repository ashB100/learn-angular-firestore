import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ProductDataService } from './product-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductList implements OnInit {
  name: string;
  price: number;
  products;

  constructor(private route: ActivatedRoute, private dataService: ProductDataService) {

  }
  
  ngOnInit() {
    console.log("Product list component ngOnInit got called");
    
    this.products = this.route.snapshot.data['items'];
    console.log('Products', this.products);
    /*this.dataService.getProducts()
        .subscribe(products => this.products = products); */
  }

  addProduct() {
    this.dataService.addProduct({
        name: this.name, 
        price: this.price
    })
    .then(() => {
        this.dataService.getProducts()
            .subscribe(products => {
                this.products = products;
            })
    })
        
  }

  deleteProduct(documentId: string) {
    this.dataService.deleteProduct(documentId)
        .then(docRef => console.log('Product Deleted', docRef))
  }
}