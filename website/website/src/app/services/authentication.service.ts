import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
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
      sessionStorage.setItem('isUserLoggedIn', "true");
      sessionStorage.setItem("userName", user.userName);

      return of(true);
    }else {
      return of(false);
    }
  }

  logout(): Observable<boolean> {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('isUserLoggedIn');

    return of(true);
  }

  register(user: User): Observable<boolean> {
    if( this.users.some((usr: User) => usr.userName === user.userName) ) {
      return of(false);
    }else {
      this.usersRef.add(user);
      sessionStorage.setItem('isUserLoggedIn', "true");
      sessionStorage.setItem("userName", user.userName);
      return of(true);
    }
  }

  getAllUsers(): Observable<any>{
    return this.usersRef.valueChanges();
  }
}
