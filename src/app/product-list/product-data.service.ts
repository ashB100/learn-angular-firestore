import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from './product.model';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductDataService implements Resolve<any> {
    productCollection: AngularFirestoreCollection<Product>;

    constructor(private afs: AngularFirestore) {
        this.productCollection = this.afs.collection('items');
    }

    resolve() {
        return this.getProducts()
            .take(1);
    }

    addProduct(product: Partial<Product>) {
        return this.productCollection.add(product as Product);
    }

    getProducts(): Observable<Product[]> {
        return this.productCollection.snapshotChanges()
            .map(actions => {
                console.log('getProducts', actions);
                return actions.map(action => {
                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data } as Product;
                });
            });
    }

    getProduct(productId: string): Observable<Product> {
        return this.afs.doc<Product>(`items/${productId}`).valueChanges();
    }

    deleteProduct(productId: string) {
        return this.afs.doc(`items/${productId}`).delete();
    }

    searchDocument(term: string) {
        return this.afs.collection('items', ref => ref.where('name', '==', term));
    }
}
