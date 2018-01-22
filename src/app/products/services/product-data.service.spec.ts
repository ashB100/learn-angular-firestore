import { TestBed } from '@angular/core/testing';
import {
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  AngularFirestoreModule
} from 'angularfire2/firestore';
import * as firebase from "firebase";

import { ProductDataService } from "./product-data.service";
import { AngularFireModule } from "angularfire2";
import { Product } from "../models/product.model";

export function randomName(): string {
  return ('collection-' + Math.random()).replace('.', '');
}

fdescribe('ProductDataService', () => {
  let service: ProductDataService;
  let afs: AngularFirestore;
  let mockCollection: AngularFirestoreCollection<Product>;
  let mockDocRef: firebase.firestore.DocumentReference;
  let mockDoc: AngularFirestoreDocument<Product>;
  
  let mockPartialProduct = { name: 'Test Product', price: 500, };
  let mockProduct = { id: 'FAKE', ...mockPartialProduct };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({ projectId: 'dummy-project' }),
        AngularFirestoreModule,
      ],
      providers: [
        ProductDataService,
      ]
    });
    
    afs = TestBed.get(AngularFirestore);
    const collectionName = randomName();
    mockCollection = afs.collection(collectionName);
    mockDocRef = afs.firestore.doc(`${collectionName}/FAKE`);
    
    spyOn(afs, 'collection').and.returnValue(mockCollection);
    spyOn(mockCollection, 'add')
      .and.returnValue(new Promise((resolve: Function) => resolve(mockDocRef)));
    
    service = TestBed.get(ProductDataService);
  });
  
  it('#addProduct should work', (done: Function) => {
    mockDocRef.set(mockPartialProduct);
    
    service.addProduct(mockPartialProduct)
      .subscribe(product => {
        console.log('#addProduct test subscr', product);
        // IMPORTANT: expect full mockProduct, not mockPartialProduct
        expect(mockCollection.add).toHaveBeenCalledWith(mockPartialProduct);
        expect(mockCollection.add).toHaveBeenCalledTimes(1);
        expect(product).toEqual(mockProduct);
        done();
      });
  });
  
  it('#getProducts should work', (done: Function) => {
    mockDocRef.set(mockPartialProduct);
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      done();
    });
  });
});
