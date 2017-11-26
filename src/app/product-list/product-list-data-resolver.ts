import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ProductDataResolver implements Resolve<any> {
    constructor(private db: AngularFirestore) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const items = this.db.collection('items').snapshotChanges()
            .map(actions => {
                return actions.map(action => {
                    const data = action.payload.doc.data();
                    const id = action.payload.doc.id;

                    return { id, ...data };
                });
            })
            .take(1);
        return items;
    }
}