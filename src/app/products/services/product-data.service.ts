import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap, map } from "rxjs/operators";
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from "rxjs/observable/of";

@Injectable()
export class ProductDataService {
  
  constructor(private afs: AngularFirestore) {}
  
  addProduct(product: Partial<Product>): Observable<Product> {
    return fromPromise(this.afs.collection('items').add(product as Product))
      .pipe(
        tap(docRef => console.log('docRef', {...product, id: docRef.id})),
        switchMap(docRef => of({...product, id: docRef.id}) as Observable<Product>)
        /*switchMap(docRef => {
          return this.afs.doc(docRef.path).valueChanges()
            .pipe(
              map(product => ({ ...product, id: docRef.id} as Product))
            );
        }) */
      );
  }
  
  getProducts(): Observable<Product[]> {
    return this.afs.collection('items').snapshotChanges()
      .map((actions: DocumentChangeAction[]) => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          
          return new Product({id, ...data}) as Product;
        });
      });
  }
  
  
  /*getProductFromRoute(route: ActivatedRoute): Observable<Product | null>  {
    return route.paramMap
        .map(params => params.get('id'))
        .switchMap((productId: string) => this.getProduct(productId));
  } */
  
  /*getProduct(productId?: string): Observable<Product | null> {
    // Look for local cache first
    if (!productId) {
      return Observable.of(null);
    }
    const productRef = this.productCollection.doc(productId);
    return productRef
      .valueChanges()
      .map((product: Product | null) => {
        if (product) {
          return new Product({id: productRef.ref.id, ...product});
        }
        return product;
      });
  } */
  
  deleteProduct(productId: string) {
    console.log('delete product', productId);
    
    return fromPromise(this.afs.doc(`items/${productId}`).delete());
  }
  
  updateProduct(product: Product) {
    // Use product id to identify document
    // Remove id from object to update collection with
    const {
      id,
      ...item
    } = product;
    
    // Get document reference and update
    // return this.productCollection.doc(options.id).update(options.product);
    return fromPromise(this.afs.collection('items').doc(id).update(item));
  }
  
  searchDocument(term: string) {
    return this.afs.collection('items', ref => ref.where('name', '==', term));
  }
}
