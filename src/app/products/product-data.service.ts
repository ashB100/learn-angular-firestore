import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from './product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductDataService  {
    productCollection: AngularFirestoreCollection<Product>;

    constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
        this.productCollection = this.afs.collection('items');
    }

    addProduct(product: Partial<Product>) {
        // If using caching, need to think about how to keep cache in sync with database
        return Observable.fromPromise(this.productCollection.add(product as Product));
    }

    getProducts(): Observable<Product[]> {
        // If internal cache is empty get list from database and save internally
        return this.productCollection.snapshotChanges()
            .map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return new Product({ id, ...data }) as Product;
                });
            });
    }
    getProductFromRoute(route: ActivatedRoute): Observable<Product | null>  {
      return route.paramMap
          .map(params => params.get('id'))
          .switchMap((productId: string) => this.getProduct(productId));
    }

    getProduct(productId?: string): Observable<Product | null>  {
        // Look for local cache first
      if (!productId) {
        return Observable.of(null);
      }
      const productRef = this.productCollection.doc(productId);
      return productRef
          .valueChanges()
          .map((product: Product|null)  => {
            if (product) {
              return new Product({ id: productRef.ref.id, ...product });
            }
            return product;
          });
    }

    deleteProduct(productId: string) {
      console.log('delete product', productId);
        return Observable.fromPromise(this.afs.doc(`items/${productId}`).delete());
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
      return Observable.fromPromise(this.productCollection.doc(id).update(item));
    }
    searchDocument(term: string) {
        return this.afs.collection('items', ref => ref.where('name', '==', term));
    }
}
