import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '../../services/user-services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public authState$ = new BehaviorSubject<any>(null);
  public userState$ = new BehaviorSubject<any>(null);


  constructor(
    @Inject('apiKey') private apiKey: string,
    @Inject('authDomain') private authDomain: string,
    @Inject('databaseURL') private databaseURL: string,
    @Inject('projectId') private projectId: string,
    @Inject('storageBucket') private storageBucket: string,
    @Inject('messagingSenderId') private messagingSenderId: string,
    private userService: UserService
  ) {
    this.configureFirebase();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authState$.next(user.email);
      } else {
        this.authState$.next(null);
      }
    });
  }

  public signup(email: string, password: string, username: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.userService.createUser(username, email).subscribe(user => {
        if (user) {
          this.userState$.next(user);
        }
      });
    }, (error) => {
      console.warn('Error: ', error.message);
    });
  }

  public login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.userService.getUserByEmail(email).subscribe(user => {
        if (user) {
          this.userState$.next(user);
        }
      });
    }, (error) => {
      console.warn('Error: ', error.message);
    });
  }
  public logout() {
    firebase.auth().signOut();
  }

  private configureFirebase() {
    const config = {
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.databaseURL,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId
    };
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
  }
}
