import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

interface User {
  uid: string;
  displayName: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  error: string;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  signup(signupForm) {
    let displayName = `${signupForm.value.firstName} ${signupForm.value.lastName}`;
    this.afAuth.auth.createUserWithEmailAndPassword(signupForm.value.email, signupForm.value.password1)
    .then(value => {
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.error = err;
    });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.updateUserData(value);
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      this.error = err;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((value) => {
      this.updateUserData(value.user);
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      this.error = err;
    });
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
    }

    return userRef.set(data, {merge: true});
  }
}
