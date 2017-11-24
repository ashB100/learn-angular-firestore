import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export interface Product {
  name: string;
  price: number;
}

export interface ProductId extends Product {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './product-list.component.html',
  styles: [`
  `]
})
export class ProductList implements OnInit {
  products$: Observable<any[]>;
  product$: Observable<Product>;
  productCollection: AngularFirestoreCollection<Product>;
  productName: string;
  price: number;
  products: [Product];

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.products = this.route.snapshot.data['items'];

    this.productCollection = this.db.collection('items');
 
    //this.product$ = this.db.collection<Product>('items').valueChanges();

    // stateChanges() method emits an array of actions as they occur
    this.productCollection.stateChanges()
        .subscribe(state => console.log("State", state));
    this.productCollection.auditTrail()
        .subscribe(audit => console.log("Audit", audit));
    // snapshotChanges() method returns metadata as well
    this.productCollection.snapshotChanges()
      .subscribe(changes => console.log("SnapshotChages", changes));
      
    this.products$ = this.productCollection.snapshotChanges()
        .map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;

            return {id, ...data};
          })
        }); 
  }
  
  addDocument() {
    this.productCollection.add({
      name: this.productName, 
      price: this.price
    })
        .then(docRef => console.log("Product added", docRef))
        .catch(err => console.log("Error adding product", err));
  }

  getDocument(documentId:string) {
    this.product$ = this.db.doc<Product>(`items/${documentId}`).valueChanges();
  }

  deleteDocument(documentId:string) {
    this.db.doc(`items/${documentId}`).delete();
  }

  searchDocument(term:string) {
    return this.db.collection('items', ref => ref.where('name', '==', term));
  }
}