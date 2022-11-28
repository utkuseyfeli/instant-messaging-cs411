import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from "rxjs";
import {ɵElement, ɵValue} from "@angular/forms";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIn: boolean = false;
  usersRef;
  users: any;
  constructor(private firestore: AngularFirestore) {
    this.usersRef = firestore.collection("users");
    this.usersRef.valueChanges().subscribe((data) => {
      this.users = data;
    });
  }

  login(user: User): Observable<boolean> {
    if( this.users.some((usr: User) => usr.userName === user.userName && usr.password === user.password) ) {
      localStorage.setItem('isUserLoggedIn', "true");
      return of(true);
    }else {
      return of(false);
    }
  }

  logout(): Observable<boolean> {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');

    return of(true);
  }

  register(user: User): boolean {
    console.log(this.users, " asd");

    if( this.users.some((usr: User) => usr.userName === user.userName) ) {
      return false;
    }else {
      this.usersRef.add(user);
      return true;
    }

  }
}