import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, query, setDoc, where } from '@angular/fire/firestore';
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

  getDocumentById(docId: string): Observable<any> {
    const docRef = doc(this.predictionCollection, docId);
    const promise = getDoc(docRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            return false;
        }
    });
    return from(promise);
}

  getAllDocuments(): Observable<any[]> {
    return collectionData(this.predictionCollection, {
      idField: 'id'
    });
  }

  getUserDocuments(uid: string): Observable<any[]> {
    const querySnapshot = query(this.predictionCollection, where('user_id', '==', uid));
    return collectionData(querySnapshot, {
        idField: 'id'
    });
  }
}
