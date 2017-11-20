import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item {
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items$: Observable<Item[]>;
  
  productName: string;
  price: number;
  
  constructor(private db: AngularFirestore) {}
  
  ngOnInit() {
    this.items$ = this.db.collection<Item>('items').valueChanges();
    this.db.collection('items').stateChanges()
        .subscribe(state => console.log("State", state));
    this.db.collection('items').auditTrail()
        .subscribe(audit => console.log("Audit", audit));
    this.db.collection('items').snapshotChanges()
        .subscribe(snap => console.log("SnapshotChanges", snap));
    this.items$.subscribe(item => console.log("Items", item));
  }
  
  addProduct(product:Item) {
    this.db.collection('items').add(product)
        .then(docRef => console.log("Product added", docRef))
        .catch(err => console.log("Error adding product", err));
  }
}
