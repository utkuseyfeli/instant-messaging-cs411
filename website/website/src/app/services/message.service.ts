import { Injectable } from '@angular/core';
import {AngularFirestore, CollectionReference} from "@angular/fire/compat/firestore";
import {Message} from "../types/message";
import {Observable} from "rxjs";
import {serverTimestamp} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  getMessagesInRoom(roomName: string): Observable<any>{
    return this.firestore.collection(roomName, (ref) => ref.orderBy("createdAt", "asc"))
      .valueChanges();
  }

  pushMessageIntoRoom(message: Message) {
    let elementRef = this.firestore.collection(message.roomName);
    elementRef.add({
      message: message.message,
      from: message.from,
      createdAt: serverTimestamp()
    });
  }
}
