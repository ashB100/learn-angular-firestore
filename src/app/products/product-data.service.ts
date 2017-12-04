import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from './product.model';
import { ActivatedRoute, ParamMap, Resolve } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";

@Injectable()
export class ProductDataService implements Resolve<any> {
    productCollection: AngularFirestoreCollection<Product>;

    constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
        this.productCollection = this.afs.collection('items');
    }

    resolve() {
        return this.getProducts()
            .take(1);
    }

    addProduct(product: Partial<Product>) {
        // If using caching, need to think about how to keep cache in sync with database
        return this.productCollection.add(product as Product);
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
      
      let productRef = this.productCollection.doc(productId);
      
      return productRef
          .valueChanges()
          .map((product: Product|null)  => {
            if(product) {
              return new Product({ id: productRef.ref.id, ...product });
            }
            return product;
          });
      //return this.productCollection.doc<Product>(productId).valueChanges();
    }

    deleteProduct(productId: string) {
        return this.afs.doc(`items/${productId}`).delete();
    }

    updateProduct(options: any) {
      // Update database and refresh internal cache of products
      // Look into whether to update only changed product in the product list or
      // just clear the cache so a new set is fetched from database
      
      // Get document reference and update
      return this.productCollection.doc(options.id).update(options.product)
    }
    searchDocument(term: string) {
        return this.afs.collection('items', ref => ref.where('name', '==', term));
    }
}
