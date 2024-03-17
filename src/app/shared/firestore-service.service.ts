import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
  firestore = inject(Firestore);
  predictionCollection = collection(this.firestore, 'prediction-data')

  addCustomDocument(customId: string, data: any): Observable<any> {
    const customDocRef = doc(this.predictionCollection, customId); // Set custom document ID
    const promise = setDoc(customDocRef, data).then(() => customId); // Use setDoc instead of addDoc
    return from(promise);
  }

  getAllDocuments(): Observable<any[]> {
    return collectionData(this.predictionCollection, {
      idField: 'id'
    });
  }
}
